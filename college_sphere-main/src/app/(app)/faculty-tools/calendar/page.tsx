
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarSync, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function CalendarIntegrationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
            <CalendarSync className="h-6 w-6 text-primary" />
        </div>
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar Integration</h1>
            <p className="text-muted-foreground">
                Sync your teaching schedule with your favorite calendar service.
            </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Connect Your Calendar</CardTitle>
          <CardDescription>
            Once connected, your teaching schedule and important deadlines will automatically appear in your personal calendar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 flex flex-col items-center justify-center text-center">
            <Image src="/integrations/google-calendar.svg" alt="Google Calendar" width={64} height={64} />
            <h3 className="text-lg font-semibold mt-4">Google Calendar</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Sync your schedule with Google Calendar.</p>
            <Button>
              Connect <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Card>
          <Card className="p-6 flex flex-col items-center justify-center text-center">
             <Image src="/integrations/outlook-calendar.svg" alt="Outlook Calendar" width={64} height={64} />
            <h3 className="text-lg font-semibold mt-4">Outlook Calendar</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Sync your schedule with Outlook Calendar.</p>
            <Button>
              Connect <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
