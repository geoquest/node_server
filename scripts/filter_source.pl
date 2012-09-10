#!/usr/bin/perl
#
# Filters out source fragments from coverage reports
#
# Pascal Bihler 2012
#
package SourceStripper;
require HTML::Filter;
@ISA=qw(HTML::Filter);
sub start
  {
     my $self = shift;
     my ($tag, $attr, $attrseq, $origtext) = @_;
     $self->{source_seen}++ if $tag eq "table";
     $self->{hide} = $self->{hide} || ( $tag eq "table") && ($attr->{'id'} eq 'source');
     $self->SUPER::start(@_);
  }
  sub end
  {
     my $self = shift;
     my ($tag, $origtext) = @_;
     $self->SUPER::end(@_);
     $self->{source_seen}-- if $tag eq "table";
     $self->{hide} = $self->{hide} && $self->{source_seen};
  }
  sub output
  {
      my $self = shift;
      unless ($self->{hide}) {
          $self->SUPER::output(@_);
      }
  }

$p = SourceStripper->new->parse_file($ARGV[0]);