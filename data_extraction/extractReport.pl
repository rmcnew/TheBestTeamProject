use strict;
use warnings;

my $fileHandle;
open ($fileHandle, $ARGV[0]) or die("Could not open input file\n");

my $occurred;
my $reported; 
my $posted;
my $location;
my $shape;
my $duration; 
my $narrative;

foreach my $line (<$fileHandle>) {
    # <TD BORDERCOLOR=#d0d7e5 ><FONT style=FONT-SIZE:11pt FACE="Calibri" COLOR=#000000>Occurred : 9/18/2018 23:20  (Entered as : 9/18 23:20)<BR>Reported: 9/18/2018 11:09:46 PM 23:09<BR>Posted: 9/27/2018<BR>Location: Layton, UT<BR>Shape: Circle<BR>Duration:45 minutes</FONT></TD>
    if ($line =~ /<TD.*>Occurred\s*:\s*(.*)<BR>Reported\s*:\s*(.*)<BR>Posted\s*:\s*(.*)<BR>Location\s*:\s*(.*)<BR>Shape\s*:\s*(.*)<BR>Duration\s*:\s*(.*)<\/FONT><\/TD>/) {
        $occurred = $1;
        $reported = $2;
        $posted = $3;
        $location = $4;
        $shape = $5;
        $duration = $6;
        if ($occurred =~ /(\d+\/\d+\/\d+ \d{2}:\d{2}).*/) {
            $occurred = $1;
        }
        next;
    # <TD BORDERCOLOR=#d0d7e5 ><FONT style=FONT-SIZE:11pt FACE="Calibri" COLOR=#000000>One orb that changed colors, moving in all directions inconsistently.  After about a half hour two more orb like crafts began to draw closer in an inconsistent pace.</FONT></TD>
    } elsif ($line =~ /<TD.*><FONT.*>(.*)<\/FONT><\/TD>/) {
       $narrative = $1; 
       last;
    }
}

print("\nOccurred|Reported|Posted|Location|Shape|Duration|Narrative\n");
print("$occurred|$reported|$posted|$location|$shape|$duration|$narrative\n");
