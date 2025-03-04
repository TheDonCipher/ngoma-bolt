'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, Image, Music2, Check, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UploadMusicPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = () => {
    setUploading(true);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          // Navigate to track details or back to music list
          // router.push('/dashboard/artist/music');
        }, 500);
      }
    }, 200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle the dropped files
    console.log(e.dataTransfer.files);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link href="/dashboard/artist/music">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Music
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Upload New Music</h1>
      </div>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="single">Single Track</TabsTrigger>
          <TabsTrigger value="album">Album / EP</TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Track Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div
                  className={`border-2 ${dragOver ? 'border-primary border-dashed bg-primary/10' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-8 h-[220px] flex flex-col items-center justify-center cursor-pointer transition-all`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById('cover-upload')?.click()
                  }
                >
                  <input
                    id="cover-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                  <Image className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="font-medium text-center">
                    Drag & drop cover image
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                    or click to browse
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    JPG, PNG or WebP (1400x1400 recommended)
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="track-title">Track Title *</Label>
                  <Input
                    id="track-title"
                    placeholder="Enter track title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="track-genre">Genre *</Label>
                  <Select>
                    <SelectTrigger id="track-genre" className="mt-1">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="afrobeats">Afrobeats</SelectItem>
                      <SelectItem value="amapiano">Amapiano</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="rnb">R&B</SelectItem>
                      <SelectItem value="reggae">Reggae</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="release-date">Release Date</Label>
                  <Input id="release-date" type="date" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="track-description">Description</Label>
              <Textarea
                id="track-description"
                placeholder="Add a description for your track..."
                className="mt-1"
                rows={4}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Audio File</h3>

            <div
              className={`border-2 ${dragOver ? 'border-primary border-dashed bg-primary/10' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('audio-upload')?.click()}
            >
              <input
                id="audio-upload"
                type="file"
                className="hidden"
                accept="audio/*"
              />
              <Music2 className="h-10 w-10 text-gray-400 mb-2" />
              <p className="font-medium text-center">
                Drag & drop your audio file
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">
                or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                MP3, WAV or FLAC (320kbps or higher recommended)
              </p>
            </div>

            {uploading && (
              <div className="mt-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Uploading...</span>
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/artist/music')}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Track
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="album">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Album Upload</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Create a collection of tracks with shared artwork and metadata
            </p>
            <Button>Start Album Upload</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
