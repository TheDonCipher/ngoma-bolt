'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Upload,
  Image,
  DollarSign,
  Link as LinkIcon,
  Save,
  Plus, // Add the Plus icon here
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function CreateEventPage() {
  const router = useRouter();
  const [dragOver, setDragOver] = useState(false);

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
          <Link href="/dashboard/artist/events">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Events
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Create New Event</h1>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
          <TabsTrigger value="details">Event Details</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="promote">Promotion</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div
                  className={`border-2 ${
                    dragOver
                      ? 'border-primary border-dashed bg-primary/10'
                      : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg p-6 h-[220px] flex flex-col items-center justify-center cursor-pointer transition-all`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById('event-cover')?.click()
                  }
                >
                  <input
                    id="event-cover"
                    type="file"
                    className="hidden"
                    accept="image/*"
                  />
                  <Image className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="font-medium text-center">
                    Drag & drop event image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    or click to browse
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div>
                  <Label htmlFor="event-title">Event Title *</Label>
                  <Input
                    id="event-title"
                    placeholder="Enter a clear title"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="event-description">Description *</Label>
                  <Textarea
                    id="event-description"
                    placeholder="What's this event about?"
                    className="mt-1"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Date & Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="event-date">Event Date *</Label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="event-date" type="date" className="pl-10" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="event-time">Event Time *</Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="event-time" type="time" className="pl-10" />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="multi-day" />
                  <Label htmlFor="multi-day">Multi-day event</Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="event-venue">Venue Name *</Label>
                  <Input
                    id="event-venue"
                    placeholder="Enter venue name"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="event-location">Address *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="event-location"
                      placeholder="Enter venue address"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="event-type">Event Type *</Label>
                  <Select>
                    <SelectTrigger id="event-type" className="mt-1">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concert">Concert</SelectItem>
                      <SelectItem value="festival">Festival</SelectItem>
                      <SelectItem value="club">Club Night</SelectItem>
                      <SelectItem value="listening">Listening Party</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/artist/events')}
            >
              Cancel
            </Button>
            <Button variant="outline" type="button">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              onClick={() => document.getElementById('tickets-tab')?.click()}
            >
              Continue to Tickets
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Ticket Information</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium">Free or Paid Event?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose if attendees need to purchase tickets
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="paid-event" className="text-right">
                    Free
                  </Label>
                  <Switch id="paid-event" />
                  <Label htmlFor="paid-event">Paid</Label>
                </div>
              </div>

              <div className="border-t pt-6 dark:border-gray-700">
                <div className="space-y-4">
                  <h4 className="font-medium">General Admission</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="ticket-price">Price</Label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="ticket-price"
                          type="number"
                          placeholder="0.00"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ticket-quantity">
                        Quantity Available
                      </Label>
                      <Input
                        id="ticket-quantity"
                        type="number"
                        placeholder="100"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="ticket-name">Ticket Name</Label>
                      <Input
                        id="ticket-name"
                        placeholder="General Admission"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Button variant="outline" size="sm">
                    <Plus className="h-3 w-3 mr-1" /> Add Ticket Type
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => document.getElementById('details-tab')?.click()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Details
            </Button>
            <div className="space-x-3">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/artist/events')}
              >
                Cancel
              </Button>
              <Button
                onClick={() => document.getElementById('promote-tab')?.click()}
              >
                Continue to Promotion
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="promote" className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Promotion Options</h3>

            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="event-link">Event Link</Label>
                  <div className="relative mt-1">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="event-link"
                      placeholder="https://ngoma.com/events/your-event"
                      className="pl-10"
                      readOnly
                    />
                  </div>
                </div>

                <div>
                  <Label>Social Media</Label>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="share-twitter" />
                      <Label htmlFor="share-twitter">Share on Twitter</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="share-instagram" />
                      <Label htmlFor="share-instagram">
                        Share on Instagram
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="share-facebook" />
                      <Label htmlFor="share-facebook">Share on Facebook</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => document.getElementById('tickets-tab')?.click()}
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Tickets
            </Button>
            <div className="space-x-3">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/artist/events')}
              >
                Cancel
              </Button>
              <Button onClick={() => router.push('/dashboard/artist/events')}>
                Publish Event
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
