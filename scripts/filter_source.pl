#!/usr/bin/perl
#
# Filters out source fragments from coverage reports
#
# Pascal Bihler 2012
#
package SourceStripper;
require HTML::Parser;
@ISA=qw(HTML::Parser);
sub declaration { $_[0]->output("<!$_[1]>")     }
sub process     { $_[0]->output($_[2])          }
sub comment     { $_[0]->output("<!--$_[1]-->") }
sub text        { $_[0]->output($_[1])          }

sub start
  {
     my $self = shift;
     my ($tag, $attr, $attrseq, $origtext) = @_;
     $self->{source_seen}++ if $tag eq "table";
     $self->{hide} = $self->{hide} || ( $tag eq "table") && ($attr->{'id'} eq 'source');
     $self->output($origtext);
  }
  sub end
  {
     my $self = shift;
     my ($tag, $origtext) = @_;
     $self->output($origtext);
     $self->{source_seen}-- if $tag eq "table";
     $self->{hide} = $self->{hide} && $self->{source_seen};
  }
  sub output
  {
      my $self = shift;
      unless ($self->{hide}) {
         print @_;
      }
  }

$p = SourceStripper->new->parse_file($ARGV[0]);