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
    } elsif ($line =~ /<TD.*><FONT.*>(.*)<\/FONT><\/TD>/) {
       $narrative = $1; 
       last;
    }
}

#print("\nOccurred|Reported|Posted|Location|Shape|Duration|Narrative\n");
print("$occurred|$reported|$posted|$location|$shape|$duration|$narrative\n");
