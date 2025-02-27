# Ngoma Backend Implementation Guide

This document provides detailed instructions for implementing the backend components of the Ngoma platform.

## Backend Architecture Overview

The Ngoma backend follows a modular architecture using NestJS, with clearly defined modules, services, and controllers. The backend implements a RESTful API that serves the frontend and handles all business logic.

**Key References:**

- [Authentication Flow Diagram](../diagrams/auth-flow-diagram.md) - Details the authentication process
- [Backend Auth Plan](../backend/auth-plan.md) - Comprehensive authentication implementation plan
- [Admin Dashboard Plan](../app/admin-dashboard-plan.md) - API requirements for the admin dashboard
- [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) - Functionality structure for artist features

## Setting Up the NestJS Project Structure

The backend follows a typical NestJS project structure:

```
backend/
├── src/
│   ├── app.module.ts          # Root application module
│   ├── main.ts                # Application entry point
│   ├── auth/                  # Authentication module
│   ├── users/                 # User management module
│   ├── music/                 # Music content module
│   ├── artists/               # Artist features module
│   ├── nfts/                  # NFT functionality module
│   ├── admin/                 # Admin features module
│   ├── common/                # Shared utilities and helpers
│   └── config/                # Configuration management
├── prisma/                    # Prisma ORM files
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
└── test/                      # Test files
```

**Technical Note:** The modular architecture allows for clear separation of concerns and better code organization. Each module represents a distinct functional area of the application, making it easier to maintain and extend the codebase.

## Authentication and Authorization

### 1. JWT Authentication Implementation

Follow the [Authentication Flow Diagram](../diagrams/auth-flow-diagram.md) for the complete flow. The diagram outlines the sequence of steps for user login, token verification, and access to protected resources.

1. **Install Required Dependencies:**

   ```bash
   cd backend
   npm install @nestjs/passport passport passport-jwt @nestjs/jwt bcrypt
   npm install -D @types/passport-jwt @types/bcrypt
   cd ..
   ```

2. **Create Authentication Module Structure:**

   ```
   backend/src/auth/
   ├── auth.module.ts
   ├── auth.service.ts
   ├── auth.controller.ts
   ├── strategies/
   │   └── jwt.strategy.ts
   ├── guards/
   │   ├── jwt-auth.guard.ts
   │   └── roles.guard.ts
   ├── decorators/
   │   └── roles.decorator.ts
   └── dto/
       ├── login.dto.ts
       └── register.dto.ts
   ```

3. **Implement JWT Strategy (`jwt.strategy.ts`):**

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { PassportStrategy } from '@nestjs/passport';
   import { ExtractJwt, Strategy } from 'passport-jwt';
   import { ConfigService } from '@nestjs/config';

   @Injectable()
   export class JwtStrategy extends PassportStrategy(Strategy) {
     constructor(private configService: ConfigService) {
       super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpiration: false,
         secretOrKey: configService.get<string>('JWT_SECRET'),
       });
     }

     async validate(payload: any) {
       return {
         userId: payload.sub,
         email: payload.email,
         roles: payload.roles,
       };
     }
   }
   ```

   **Technical Note:** The JWT strategy extracts and validates the token from incoming requests. The `validate` method returns user data that will be attached to the request object, making it accessible in controllers.

4. **Implement Auth Service (`auth.service.ts`):**

   ```typescript
   import { Injectable, UnauthorizedException } from '@nestjs/common';
   import { JwtService } from '@nestjs/jwt';
   import { PrismaService } from '../prisma/prisma.service';
   import { UsersService } from '../users/users.service';
   import { LoginDto } from './dto/login.dto';
   import * as bcrypt from 'bcrypt';

   @Injectable()
   export class AuthService {
     constructor(
       private usersService: UsersService,
       private jwtService: JwtService,
       private prisma: PrismaService
     ) {}

     async login(loginDto: LoginDto) {
       const user = await this.validateUser(loginDto.email, loginDto.password);
       if (!user) {
         throw new UnauthorizedException('Invalid credentials');
       }

       return this.generateJwtToken(user);
     }

     async validateUser(email: string, password: string) {
       const user = await this.usersService.findByEmail(email);
       if (user && (await bcrypt.compare(password, user.password))) {
         const { password, ...result } = user;
         return result;
       }
       return null;
     }

     generateJwtToken(user: any) {
       const payload = {
         email: user.email,
         sub: user.id,
         roles: user.roles,
       };

       return {
         access_token: this.jwtService.sign(payload),
         user: {
           id: user.id,
           email: user.email,
           name: user.name,
           roles: user.roles,
         },
       };
     }

     verifyJwtToken(token: string) {
       try {
         return this.jwtService.verify(token);
       } catch (error) {
         throw new UnauthorizedException('Invalid token');
       }
     }
   }
   ```

   **Security Note:** Never store passwords in plain text. Always use a strong hashing algorithm like bcrypt with an appropriate number of salt rounds (10-12 is recommended for most applications).

5. **Implement Auth Controller (`auth.controller.ts`):**

   ```typescript
   import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
   import { AuthService } from './auth.service';
   import { LoginDto } from './dto/login.dto';
   import { RegisterDto } from './dto/register.dto';
   import { UsersService } from '../users/users.service';
   import { JwtAuthGuard } from './guards/jwt-auth.guard';

   @Controller('auth')
   export class AuthController {
     constructor(
       private authService: AuthService,
       private usersService: UsersService
     ) {}

     @Post('login')
     async login(@Body() loginDto: LoginDto) {
       return this.authService.login(loginDto);
     }

     @Post('register')
     async register(@Body() registerDto: RegisterDto) {
       return this.usersService.create(registerDto);
     }

     @UseGuards(JwtAuthGuard)
     @Post('logout')
     async logout(@Request() req) {
       // In a token-based auth system like JWT,
       // logout is typically handled client-side
       // by removing the stored token.
       // This endpoint can be used for auditing or
       // to invalidate tokens if you implement a token blacklist.
       return { message: 'Logout successful' };
     }
   }
   ```

   **API Note:** As shown in the [Authentication Flow Diagram](../diagrams/auth-flow-diagram.md), the login endpoint returns a JWT token that the frontend should store securely. For enhanced security, consider implementing token refresh mechanisms.

6. **Configure Auth Module (`auth.module.ts`):**

   ```typescript
   import { Module } from '@nestjs/common';
   import { JwtModule } from '@nestjs/jwt';
   import { PassportModule } from '@nestjs/passport';
   import { ConfigService } from '@nestjs/config';
   import { AuthService } from './auth.service';
   import { AuthController } from './auth.controller';
   import { UsersModule } from '../users/users.module';
   import { JwtStrategy } from './strategies/jwt.strategy';
   import { PrismaModule } from '../prisma/prisma.module';

   @Module({
     imports: [
       UsersModule,
       PrismaModule,
       PassportModule,
       JwtModule.registerAsync({
         inject: [ConfigService],
         useFactory: async (configService: ConfigService) => ({
           secret: configService.get<string>('JWT_SECRET'),
           signOptions: {
             expiresIn: configService.get<string>('JWT_EXPIRATION', '1d'),
           },
         }),
       }),
     ],
     controllers: [AuthController],
     providers: [AuthService, JwtStrategy],
     exports: [AuthService],
   })
   export class AuthModule {}
   ```

7. **Create JwtAuthGuard (`guards/jwt-auth.guard.ts`):**

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { AuthGuard } from '@nestjs/passport';

   @Injectable()
   export class JwtAuthGuard extends AuthGuard('jwt') {}
   ```

### 2. Role-Based Access Control (RBAC)

As outlined in the [Backend Auth Plan](../backend/auth-plan.md), RBAC is essential for controlling access to different parts of the application, particularly for admin-only features.

1. **Define User Roles (`roles/role.enum.ts`):**

   ```typescript
   export enum Role {
     ADMIN = 'admin',
     ARTIST = 'artist',
     FAN = 'fan',
   }
   ```

2. **Create Roles Decorator (`decorators/roles.decorator.ts`):**

   ```typescript
   import { SetMetadata } from '@nestjs/common';
   import { Role } from '../roles/role.enum';

   export const ROLES_KEY = 'roles';
   export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
   ```

3. **Implement RolesGuard (`guards/roles.guard.ts`):**

   ```typescript
   import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
   import { Reflector } from '@nestjs/core';
   import { Role } from '../roles/role.enum';
   import { ROLES_KEY } from '../decorators/roles.decorator';

   @Injectable()
   export class RolesGuard implements CanActivate {
     constructor(private reflector: Reflector) {}

     canActivate(context: ExecutionContext): boolean {
       const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
         ROLES_KEY,
         [context.getHandler(), context.getClass()]
       );

       if (!requiredRoles) {
         return true;
       }

       const { user } = context.switchToHttp().getRequest();
       return requiredRoles.some((role) => user.roles?.includes(role));
     }
   }
   ```

   **Implementation Note:** The RolesGuard works by checking if the authenticated user has at least one of the required roles for accessing an endpoint. It extracts required roles from method or controller metadata set by the @Roles decorator.

4. **Use Guards and Decorators in Controllers:**

   ```typescript
   @Controller('admin/users')
   @UseGuards(JwtAuthGuard, RolesGuard)
   @Roles(Role.ADMIN)
   export class AdminUsersController {
     // This controller will only be accessible to users with ADMIN role
   }
   ```

   **Best Practice:** Apply the most specific guards at the method level, and more general guards at the controller level. This allows for fine-grained access control.

## API Implementation

### 1. Create Core Modules

For each core module, follow this structure:

```
backend/src/<module-name>/
├── <module-name>.module.ts
├── <module-name>.controller.ts
├── <module-name>.service.ts
├── dto/
│   ├── create-<entity>.dto.ts
│   └── update-<entity>.dto.ts
└── entities/
    └── <entity>.entity.ts
```

The primary modules to implement:

1. **User Module** - User account management
2. **Music Module** - Tracks, albums, and playlists
3. **Artist Module** - Artist profiles and management features
4. **NFT Module** - NFT creation, ownership, and transactions
5. **Admin Module** - Administrative features

**Reference:** See the [Admin Dashboard Plan](../app/admin-dashboard-plan.md) for detailed requirements of the admin module, and the [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) for artist module features.

### 2. RESTful API Development

Example implementation for the User module:

1. **User Entity (`users/entities/user.entity.ts`):**

   ```typescript
   import { Role } from '../../auth/roles/role.enum';

   export class User {
     id: string;
     email: string;
     password: string;
     name: string;
     roles: Role[];
     createdAt: Date;
     updatedAt: Date;
   }
   ```

2. **DTOs (`users/dto/`):**

   ```typescript
   // create-user.dto.ts
   export class CreateUserDto {
     email: string;
     password: string;
     name: string;
     roles?: string[];
   }

   // update-user.dto.ts
   export class UpdateUserDto {
     email?: string;
     password?: string;
     name?: string;
     roles?: string[];
   }
   ```

   **Validation Note:** Add class-validator decorators to these DTOs to enforce input validation:

   ```typescript
   import {
     IsEmail,
     IsNotEmpty,
     IsString,
     MinLength,
     IsOptional,
     IsArray,
   } from 'class-validator';

   export class CreateUserDto {
     @IsEmail()
     @IsNotEmpty()
     email: string;

     @IsString()
     @MinLength(8)
     @IsNotEmpty()
     password: string;

     @IsString()
     @IsNotEmpty()
     name: string;

     @IsArray()
     @IsOptional()
     roles?: string[];
   }
   ```

3. **User Service (`users/users.service.ts`):**

   ```typescript
   import {
     Injectable,
     ConflictException,
     NotFoundException,
   } from '@nestjs/common';
   import { PrismaService } from '../prisma/prisma.service';
   import { CreateUserDto } from './dto/create-user.dto';
   import { UpdateUserDto } from './dto/update-user.dto';
   import * as bcrypt from 'bcrypt';

   @Injectable()
   export class UsersService {
     constructor(private prisma: PrismaService) {}

     async create(createUserDto: CreateUserDto) {
       const existingUser = await this.prisma.user.findUnique({
         where: { email: createUserDto.email },
       });

       if (existingUser) {
         throw new ConflictException('Email already in use');
       }

       const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

       return this.prisma.user.create({
         data: {
           ...createUserDto,
           password: hashedPassword,
           roles: createUserDto.roles || ['fan'],
         },
         select: {
           id: true,
           email: true,
           name: true,
           roles: true,
           createdAt: true,
         },
       });
     }

     async findAll() {
       return this.prisma.user.findMany({
         select: {
           id: true,
           email: true,
           name: true,
           roles: true,
           createdAt: true,
         },
       });
     }

     async findOne(id: string) {
       const user = await this.prisma.user.findUnique({
         where: { id },
         select: {
           id: true,
           email: true,
           name: true,
           roles: true,
           createdAt: true,
         },
       });

       if (!user) {
         throw new NotFoundException(`User with ID ${id} not found`);
       }

       return user;
     }

     async findByEmail(email: string) {
       return this.prisma.user.findUnique({
         where: { email },
       });
     }

     async update(id: string, updateUserDto: UpdateUserDto) {
       if (updateUserDto.password) {
         updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
       }

       try {
         return await this.prisma.user.update({
           where: { id },
           data: updateUserDto,
           select: {
             id: true,
             email: true,
             name: true,
             roles: true,
             createdAt: true,
             updatedAt: true,
           },
         });
       } catch (error) {
         throw new NotFoundException(`User with ID ${id} not found`);
       }
     }

     async remove(id: string) {
       try {
         await this.prisma.user.delete({
           where: { id },
         });
       } catch (error) {
         throw new NotFoundException(`User with ID ${id} not found`);
       }
     }
   }
   ```

4. **User Controller (`users/users.controller.ts`):**

   ```typescript
   import {
     Controller,
     Get,
     Post,
     Body,
     Patch,
     Param,
     Delete,
     UseGuards,
     Request,
   } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { CreateUserDto } from './dto/create-user.dto';
   import { UpdateUserDto } from './dto/update-user.dto';
   import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
   import { RolesGuard } from '../auth/guards/roles.guard';
   import { Roles } from '../auth/decorators/roles.decorator';
   import { Role } from '../auth/roles/role.enum';

   @Controller('users')
   export class UsersController {
     constructor(private readonly usersService: UsersService) {}

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.ADMIN)
     @Post()
     create(@Body() createUserDto: CreateUserDto) {
       return this.usersService.create(createUserDto);
     }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.ADMIN)
     @Get()
     findAll() {
       return this.usersService.findAll();
     }

     @UseGuards(JwtAuthGuard)
     @Get('me')
     getProfile(@Request() req) {
       return this.usersService.findOne(req.user.userId);
     }

     @UseGuards(JwtAuthGuard)
     @Get(':id')
     findOne(@Param('id') id: string) {
       return this.usersService.findOne(id);
     }

     @UseGuards(JwtAuthGuard)
     @Patch('me')
     updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
       return this.usersService.update(req.user.userId, updateUserDto);
     }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.ADMIN)
     @Patch(':id')
     update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
       return this.usersService.update(id, updateUserDto);
     }

     @UseGuards(JwtAuthGuard, RolesGuard)
     @Roles(Role.ADMIN)
     @Delete(':id')
     remove(@Param('id') id: string) {
       return this.usersService.remove(id);
     }
   }
   ```

5. **User Module (`users/users.module.ts`):**

   ```typescript
   import { Module } from '@nestjs/common';
   import { UsersService } from './users.service';
   import { UsersController } from './users.controller';
   import { PrismaModule } from '../prisma/prisma.module';

   @Module({
     imports: [PrismaModule],
     controllers: [UsersController],
     providers: [UsersService],
     exports: [UsersService],
   })
   export class UsersModule {}
   ```

### 3. Admin Dashboard API Implementation

Refer to the [Admin Dashboard Plan](../app/admin-dashboard-plan.md) for detailed requirements and [Admin Dashboard Diagram](../diagrams/admin-dashboard-diagram.md) for structure visualization. Follow this structure:

```
backend/src/admin/
├── admin.module.ts
├── controllers/
│   ├── admin-users.controller.ts
│   ├── admin-tracks.controller.ts
│   ├── admin-albums.controller.ts
│   ├── admin-events.controller.ts
│   ├── admin-merchandise.controller.ts
│   └── admin-metrics.controller.ts
└── services/
    └── admin-metrics.service.ts
```

**Implementation Note:** The admin dashboard requires robust filtering, sorting, and pagination capabilities as specified in the Admin Dashboard Plan. Implement these features consistently across all admin controllers.

Example implementation for Admin Users controller:

```typescript
@Controller('admin/users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminUsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query) {
    // Handle filtering, sorting, pagination as specified in the Admin Dashboard Plan
    const { page = 1, pageSize = 20, sort, filter } = query;
    const skip = (page - 1) * pageSize;

    // Parse filter string (e.g. "role:artist,status:active")
    const filterParams = {};
    if (filter) {
      filter.split(',').forEach((param) => {
        const [key, value] = param.split(':');
        filterParams[key] = value;
      });
    }

    // Build query based on filters
    const where = {};
    if (filterParams['role']) {
      where['roles'] = { has: filterParams['role'] };
    }

    // Handle sorting
    const orderBy = {};
    if (sort) {
      const [field, direction] = sort.split(':');
      orderBy[field] = direction || 'asc';
    } else {
      orderBy['createdAt'] = 'desc';
    }

    // Execute query with pagination
    const [users, totalCount] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: Number(pageSize),
        select: {
          id: true,
          email: true,
          name: true,
          roles: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: users,
      pagination: {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / Number(pageSize)),
      },
    };
  }

  // Other endpoints as specified in the Admin Dashboard Plan...
}
```

### 4. Music Features API Implementation

Follow the [Albums Feature Diagram](../diagrams/albums-feature-diagram.md) for album and track management. Create the following controllers and services:

```typescript
// Example album controller
@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  findAll(@Query() query) {
    // Implement filtering, pagination for albums
    return this.albumService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ARTIST, Role.ADMIN)
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto, @Request() req) {
    // Only artists and admins can create albums
    return this.albumService.create(createAlbumDto, req.user.userId);
  }

  // Other endpoints...
}
```

## Web3 Integration

Reference the NFT functionality in the [Artist Dashboard Diagram](../diagrams/artist-dashboard-diagram.md) for integrating NFT features.

1. **Install Required Dependencies:**

   ```bash
   cd backend
   npm install ethers
   cd ..
   ```

2. **Create NFT Service:**

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { ConfigService } from '@nestjs/config';
   import { ethers } from 'ethers';
   import { PrismaService } from '../prisma/prisma.service';

   @Injectable()
   export class NftService {
     private provider: ethers.providers.JsonRpcProvider;
     private contract: ethers.Contract;

     constructor(
       private configService: ConfigService,
       private prisma: PrismaService
     ) {
       // Initialize ethers provider and contract
       this.provider = new ethers.providers.JsonRpcProvider(
         this.configService.get<string>('WEB3_PROVIDER_URL')
       );

       // Initialize contract with ABI and address
       this.contract = new ethers.Contract(
         this.configService.get<string>('NFT_CONTRACT_ADDRESS'),
         NFT_ABI, // Import your contract ABI
         this.provider
       );
     }

     async verifyOwnership(userId: string, tokenId: number): Promise<boolean> {
       // Get user's wallet address from database
       const user = await this.prisma.user.findUnique({
         where: { id: userId },
         select: { walletAddress: true },
       });

       if (!user || !user.walletAddress) {
         return false;
       }

       try {
         // Call contract to check ownership
         const owner = await this.contract.ownerOf(tokenId);
         return owner.toLowerCase() === user.walletAddress.toLowerCase();
       } catch (error) {
         console.error('Error verifying NFT ownership:', error);
         return false;
       }
     }

     async mintNft(userId: string, metadataUri: string): Promise<any> {
       // This would typically be called by a separate service/worker
       // that has access to a signing wallet (not in the API directly)
       // For demonstration purposes only

       const user = await this.prisma.user.findUnique({
         where: { id: userId },
         select: { walletAddress: true },
       });

       if (!user || !user.walletAddress) {
         throw new Error('User has no linked wallet address');
       }

       // In a real implementation:
       // 1. This would likely be an off-chain record of the intent to mint
       // 2. A separate service with wallet credentials would execute the actual mint
       // 3. The transaction would be tracked and updated in the database

       return {
         status: 'pending',
         userId,
         metadataUri,
         destinationAddress: user.walletAddress,
       };
     }

     async getNftsForUser(userId: string): Promise<any[]> {
       // Get user's wallet address
       const user = await this.prisma.user.findUnique({
         where: { id: userId },
         select: { walletAddress: true },
       });

       if (!user || !user.walletAddress) {
         return [];
       }

       // Query database for NFTs associated with this user
       const nfts = await this.prisma.nft.findMany({
         where: { ownerAddress: user.walletAddress },
       });

       // Enhance with metadata from blockchain if needed
       return nfts;
     }
   }
   ```

   **Technical Note:** For production applications, never expose private keys in your backend code. Use a secure solution like a hardware security module (HSM) or a managed service for handling transactions that require signing.

3. **Create NFT Module and Controller:**

   ```typescript
   // nfts/nfts.controller.ts
   import {
     Controller,
     Get,
     Post,
     Body,
     Param,
     UseGuards,
     Request,
   } from '@nestjs/common';
   import { NftService } from './nft.service';
   import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
   import { CreateNftDto } from './dto/create-nft.dto';

   @Controller('nfts')
   export class NftsController {
     constructor(private nftService: NftService) {}

     @UseGuards(JwtAuthGuard)
     @Get('my-collection')
     async getMyNfts(@Request() req) {
       return this.nftService.getNftsForUser(req.user.userId);
     }

     @UseGuards(JwtAuthGuard)
     @Post()
     async createNft(@Body() createNftDto: CreateNftDto, @Request() req) {
       return this.nftService.mintNft(
         req.user.userId,
         createNftDto.metadataUri
       );
     }

     @UseGuards(JwtAuthGuard)
     @Get('verify/:tokenId')
     async verifyOwnership(@Param('tokenId') tokenId: string, @Request() req) {
       return {
         owned: await this.nftService.verifyOwnership(
           req.user.userId,
           Number(tokenId)
         ),
       };
     }
   }
   ```

## Database Schema Implementation with Prisma

Refer to the [Admin Dashboard Plan](../app/admin-dashboard-plan.md) for the data models required. Implement these models in your Prisma schema:

```prisma
// Example schema.prisma file
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(uuid())
  email         String    @unique
  password      String
  name          String
  roles         String[]  @default(["fan"])
  walletAddress String?   @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  tracks        Track[]
  albums        Album[]
  events        Event[]
  merchandise   Merchandise[]
}

model Track {
  id          String   @id @default(uuid())
  title       String
  audioUrl    String
  coverArt    String?
  duration    Int
  genre       String?
  artistId    String
  albumId     String?
  releaseDate DateTime
  isNft       Boolean  @default(false)
  nftAddress  String?
  tokenId     Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  artist      User     @relation(fields: [artistId], references: [id])
  album       Album?   @relation(fields: [albumId], references: [id])
}

model Album {
  id          String   @id @default(uuid())
  title       String
  coverArt    String?
  artistId    String
  releaseDate DateTime
  isNft       Boolean  @default(false)
  nftAddress  String?
  tokenId     Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  artist      User     @relation(fields: [artistId], references: [id])
  tracks      Track[]
}

model Event {
  id          String   @id @default(uuid())
  name        String
  description String?
  venue       String
  date        DateTime
  artistId    String
  ticketUrl   String?
  isNft       Boolean  @default(false)
  nftAddress  String?
  tokenId     Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  artist      User     @relation(fields: [artistId], references: [id])
}

model Merchandise {
  id          String   @id @default(uuid())
  name        String
  description String?
  price       Float
  imageUrl    String?
  artistId    String
  isNft       Boolean  @default(false)
  nftAddress  String?
  tokenId     Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  artist      User     @relation(fields: [artistId], references: [id])
}

model Badge {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  imageUrl    String?
  criteria    Json?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Nft {
  id           String   @id @default(uuid())
  tokenId      Int
  contractAddress String
  ownerAddress  String
  metadataUri   String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([tokenId, contractAddress])
}
```

**Technical Note:** This schema implements the relationships described in the Admin Dashboard Plan. The NFT-related fields allow for tracking both traditional content and NFT-tokenized content within the same models.

## API Documentation with Swagger

Implement OpenAPI/Swagger documentation for your API endpoints to make them discoverable and easy to test:

1. **Install Swagger dependencies:**

   ```bash
   cd backend
   npm install @nestjs/swagger swagger-ui-express
   cd ..
   ```

2. **Configure Swagger in main.ts:**

   ```typescript
   // backend/src/main.ts
   import { NestFactory } from '@nestjs/core';
   import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
   import { ValidationPipe } from '@nestjs/common';
   import { AppModule } from './app.module';

   async function bootstrap() {
     const app = await NestFactory.create(AppModule);

     // Set up validation pipes
     app.useGlobalPipes(
       new ValidationPipe({
         whitelist: true,
         transform: true,
       })
     );

     // Set up Swagger
     const config = new DocumentBuilder()
       .setTitle('Ngoma API')
       .setDescription('The Ngoma music platform API')
       .setVersion('1.0')
       .addBearerAuth()
       .build();
     const document = SwaggerModule.createDocument(app, config);
     SwaggerModule.setup('api', app, document);

     // Configure CORS
     app.enableCors({
       origin: process.env.FRONTEND_URL || 'http://localhost:3000',
       credentials: true,
     });

     await app.listen(process.env.PORT || 4000);
   }
   bootstrap();
   ```

3. **Decorate DTOs and controllers with Swagger annotations:**

   ```typescript
   // Example for a DTO
   import { ApiProperty } from '@nestjs/swagger';

   export class CreateTrackDto {
     @ApiProperty({ description: 'Track title' })
     title: string;

     @ApiProperty({ description: 'URL to audio file' })
     audioUrl: string;

     // ...other properties
   }
   ```

## Testing Strategy

Implement a comprehensive testing strategy for your backend:

1. **Unit Tests:**

   - Test individual services and utility functions in isolation
   - Mock dependencies using Jest mocks

2. **Integration Tests:**

   - Test controllers with real services but mocked database
   - Verify correct API responses and error handling

3. **E2E Tests:**
   - Test complete API flows with a test database
   - Verify authentication, authorization, and business logic

Example unit test for AuthService:

```typescript
// auth/auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if credentials are valid', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        roles: ['fan'],
      };

      (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', 'password');
      expect(result).toEqual({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
        roles: ['fan'],
      });
    });

    it('should return null if user not found', async () => {
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.validateUser(
        'nonexistent@example.com',
        'password'
      );
      expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
        name: 'Test User',
        roles: ['fan'],
      };

      (usersService.findByEmail as jest.Mock).mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword'
      );
      expect(result).toBeNull();
    });
  });
});
```

## Next Steps

After implementing the backend components, proceed to the [Frontend Implementation Guide](frontend_guide.md) to develop the client-side of the application. The frontend will need to interact with the RESTful API endpoints you've created to provide a complete user experience.

Refer to the [Security Guide](security_guide.md) for best practices to secure your backend implementation, especially for authentication and Web3 integration.
