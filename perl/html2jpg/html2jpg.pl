#!/usr/bin/perl
# Filename:	html2jpg
# Author:	David Ljung Madison <DaveSource.com>
  my $VERSION=  1.03;
# See License:	http://MarginalHacks.com/License
# Description:	Takes a screenshot of an HTML page (uses opera)
#
# CHANGELOG
#
# 1.03  2004/09/23
# ----------------
# Updated to opera 9.01
#
# 1.02  2004/09/23
# ----------------
#   (Thanks Keith C. Ivey, keith at smokefreedc org)
# + Added -t and -r args
#
# 1.01  2004/??/??
# -----------------
# + Added -opera browser select support
#
# 1.00  200?/??/??
# ----------------
# + Public release
#
use strict;

##################################################
# Setup the variables
##################################################
my $PROGNAME = $0;
$PROGNAME =~ s|.*/||;

my $GRAB = 'xwd -silent -nobdrs -id %id | convert -quality 85 - %out';
my $XINFO = 'xwininfo -tree -root';

my $BROWSER = 'mozilla';	# Must match find_window() code - see usage()

# Default snapshot type (based off html2<type>)
my $TYPE = ($PROGNAME =~ /2(.+)$/) ? $1 : "jpg";

##################################################
# Usage
##################################################
sub usage {
  foreach my $msg (@_) { print STDERR "ERROR:  $msg\n"; }

print STDERR <<USAGE;

Usage:	$PROGNAME [-d] [-o out] <URL>
  Takes a screenshot of an HTML page and saves to an image
  
  -o <out>      postfix determines image type [$PROGNAME.$TYPE]
  -s <sleep>    Time to sleep before window dump
  -g <geom>     Browser geometry
  -t <geom>     Size of thumbnail
  -r            Reuse existing browser window
  -d            Set debug mode
  -opera        Use opera browser instead of $BROWSER

Kludges:
  - We don't know when the page is finished loading
  - Rule of thumb for finding subwindow is guesswork!
    If you're getting the wrong window, comment out call to subwindow()
  - Browser geometry ignored if browser doesn't create a new window
    (Such as opera in "mdi" mode)
  - Dependent on xwd command and output of xwininfo and ...
  - Browser can't be iconified or partially off-screen
  - Only gets portion of html displayed in browser
  - Requires "Mozilla" or "Opera" browser
    (update find_window() code for other browsers)
  - Opens up a bunch o' windows in your browser and leaves them there

Examples:
% $PROGNAME MarginalHacks.com -o MH.gif		# Snapshot of MarginalHacks
% $PROGNAME GetDave.com -o gif:- | xv -		# Pipe output, type gif

Heck - I just needed something to automate screenshots of HTML output.
Ask <your browser> to add '-remote SaveAsImage(file)' if you don't like it.  :)

Author:      David Ljung Madison
License:     http://MarginalHacks.com/License
Please see!  http://MarginalHacks.com/Pay

USAGE

  exit -1;
}

sub version {
  print "\n";
  printf "This is $PROGNAME version %4.2f\n",$VERSION;
  print "\n";
  print "Copyright (c) 2002 David Ljung Madison <MarginalHacks.com>\n";
  print "\n";
  exit -1;
}

sub parse_args {
  my $url;
  my ($out,$sleep,$geom,$thumb) = ("$PROGNAME.$TYPE",5,"800x600");
  while (my $arg=shift(@ARGV)) {
    if ($arg =~ /^-h$/) { usage(); }
    if ($arg =~ /^-v$/) { version(); }
    if ($arg =~ /^-d$/) { $MAIN::DEBUG=1; next; }
    if ($arg =~ /^-o$/) { $out = shift(@ARGV); next; }
    if ($arg =~ /^-s$/) { $sleep = shift(@ARGV); next; }
    if ($arg =~ /^-g$/) { $geom = shift(@ARGV); next; }
    if ($arg =~ /^-t$/) { $thumb = shift(@ARGV); next; }
    if ($arg =~ /^-r$/) { $MAIN::REUSE = 1; next; }
    if ($arg =~ /^-opera$/) { $BROWSER = "opera"; next; }
    if ($arg =~ /^-.+/) { usage("Unknown option: $arg"); }
    usage("Too many URLs specified [$arg and $url]") if defined $url;
    $url=$arg;
  }
  usage("No URLs specified!") unless $url;

  ($out,$url,$sleep,$geom,$thumb);
}

sub debug {
  return unless $MAIN::DEBUG;
  foreach my $msg (@_) { print STDERR "[$PROGNAME] $msg\n"; }
}

##################################################
# Main code
##################################################
sub load {
  my ($url,$geom) = @_;

  my $browser = "$BROWSER -geometry $geom -remote \'openURL($url";
  $browser .= ",new-window" unless $MAIN::REUSE;
  $browser .= ")\'";
  system($browser);
}

# Geometry regexp for xwininfo (saves x and y and offset)
my $GEOM_RE = '\s(\d+)x(\d+)\+(\-?\d+)\+(\-?\d+)\s+\+\-?\d+\+\-?\d+$';

# Find smallest subwindow that is at least 80%
# (We're trying to get rid of the scrollbars, menubars, etc...)
sub subwindow {
  my ($spacing,$window,$x,$y) = @_;
  my $smallest = $x*$y;
  $x*=.8;
  $y*=.8;
  while (<XINFO>) {
    # We're done traversing this window's tree when we find a new window
    # with the same or less spacing (or if we run out of xinfo).
    return $window if (/^(\s+)0x[0-9a-f]+/ && length($1)<=length($spacing));

    if (/^\s+(0x[0-9a-f]+).*$GEOM_RE/ &&
        # $4>=0 && $5>=0 &&	# Only look for positive offset windows?
        $2>=$x && $3>=$y && $2*$3<$smallest) {
      $window = $1;
      $smallest = $2*$3;
      debug("Smaller subwindow: $window ${2}x$3",$_);
    }
  }
  return $window;
}

sub opera_find_window {
  open(XINFO,"$XINFO|") || die("Couldn't run: [$XINFO]\n");

  # Find the opera window (and the current title of the top window)
  my ($spacing,$title,$x,$y);
  while(<XINFO>) {
    # # This could easily break and is very opera specific (works on 6.03)
    # last if (($spacing,$title,$x,$y) = (/^(\s+)0x[0-9a-f]+ "Opera .*\[(.+)\]": \("opera" "opera"\)\s*$GEOM_RE$/));
    # This could easily break and is very opera specific (works on 7.50 & 8.50)
    last if (($spacing,$title,$x,$y) = (/^(\s+)0x[0-9a-f]+ "(.+) - Opera \d+\.\d+ ?": \("opera" "Opera"\)\s*$GEOM_RE$/));
    # This could easily break and is very opera specific (works on beta)
    last if (($spacing,$title,$x,$y) = (/^(\s+)0x[0-9a-f]+ "(.+) - Opera Beta": \("opera" "Opera"\)\s*$GEOM_RE$/));
    # This could easily break and is very opera specific (works on 9.01)
    last if (($spacing,$title,$x,$y) = (/^(\s+)0x[0-9a-f]+ "(.+) - Opera": \("opera" "Opera"\)\s*$GEOM_RE$/));
  }
  die("Couldn't find window [Opera] in [$XINFO]\n") unless $title && $x && $y;

  # Now find the subwindow with the same title
  my $window;
  while (<XINFO>) {
    die("Couldn't find subwindow [$title] in Opera windows:\n[$XINFO]\n")
      if (/^(\s+)0x[0-9a-f]+/ && length($1)<=length($spacing));
    if (/^(\s+)(0x[0-9a-f]+)\s+"$title".*$GEOM_RE/) {
      ($spacing,$window,$x,$y) = ($1,$2,$3,$4);
      last;
    }
  }
  die("Couldn't find subwindow [$title] in Opera windows:\n[$XINFO]\n")
    unless $window;
  debug("Found: $window [$title] ${x}x$y");

  $window = subwindow($spacing,$window,$x,$y);
  debug("Final window: $window");

  close XINFO;
  $window;
}

sub mozilla_find_window {
  open(XINFO,"$XINFO|") || die("Couldn't run: [$XINFO]\n");

  # Pick the first mozilla window.  It's got the title in it, but
  # we have no way of knowing if that matches the URL, so we'll
  # hope this is the right one..
  my ($spacing,$id,$title,$x,$y);
  while(<XINFO>) {
    # This could easily break and is very mozilla specific (works on firefox)
    # Looks for [...("Mozilla" "navigator:browser") ..]
    # I've had this reported:     0x80002f "TITLE - Mozilla": ("Gecko" "Mozilla-bin")  889x687+0+22  +136+44
    last if (($spacing,$id,$title,$x,$y) = (/^(\s+)(0x[0-9a-f]+) "(.*)\s*-\s*Mozilla.*": \("Mozilla" "navigator:browser"\)\s*$GEOM_RE$/));

    # Submitted by Luca Deplano - ldeplano at it tiscali com
    # Mozilla 1.4.1 :
    last if (($spacing,$id,$title,$x,$y) = (/^(\s+)(0x[0-9a-f]+) "(.*)\s*-\s*Mozilla.*": \("mozilla-bin" "Mozilla-bin"\)\s*$GEOM_RE$/));
    # Mozilla Firefox 1.0.4
    last if (($spacing,$id,$title,$x,$y) = (/^(\s+)(0x[0-9a-f]+) "(.*)\s*-\s*Mozilla Firefox.*": \("Gecko" "Firefox-bin"\)\s*$GEOM_RE$/));
		# Debian Mozilla Firefox
		last if (($spacing,$id,$title,$x,$y) = (/^(\s+)(0x[0-9a-f]+) "(.*)\s*-\s*Mozilla Firefox.*": \("firefox-bin" "Firefox-bin"\)\s*$GEOM_RE$/));
  }
  die("Couldn't find window [Mozilla] in [$XINFO]\n") unless $title && $x && $y;

  $title =~ s/^\s*//;
  $title =~ s/\s*$//;
  print "Using mozilla window: \"$title\"\n";

  $id = subwindow($spacing,$id,$x,$y);
  debug("Final window: $id");

  close XINFO;
  $id;

#  # Find a subwindow with the same geometry minus a few percent off the top
#  while (<XINFO>) {
#    my ($sp,$id,$x,$y) = (/^(\s+)(0x[0-9a-f]+)\s+".*".*$GEOM_RE/);
#    print "Got: $id and $x,$y\n";
#exit if length($sp) <= length($spacing);
#  }
#  debug("Found: $id [$title] ${x}x$y");
#
#  $window = subwindow($spacing,$window,$x,$y);
#  debug("Final window: $window");
#
#  close XINFO;
#  $window;
}

# I'm using mozilla..
sub find_window {
  $BROWSER eq "opera" ?
    opera_find_window(@_) :
    mozilla_find_window(@_);
}

sub grab {
  my ($id,$out,$thumb) = @_;
  my $grab = $GRAB;
  $grab =~ s/%id/$id/g;
  $grab =~ s/%out/$out/g;
  $grab =~ s/convert /convert -resize $thumb / if $thumb;  # Kludgy, but..
  system("$grab");
  die("Trouble with grab [$?]:\n  $grab\n") if $?;
}

sub main {
  my ($out,$url,$sleep,$geom,$thumb) = parse_args();
  load($url,$geom);
  sleep($sleep);
  my $window = find_window();
  grab($window,$out,$thumb);
}
main();
