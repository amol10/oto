#!/bin/bash

mdelay=$1
printf "//<sed replace\n"
printf "\\t\\t\\tvar sounds = {\n"
for file in `ls sounds`
do
    #str=$( printf $str\\t$file\\n )
    sound=${file::-4}
    printf "\\t\\t\\t\"$sound\": { file: \"sounds/$file\", mdelay: $mdelay, audio: null },\\n"
done

printf "\\t\\t\\t}\n"
printf "\\t\\t\\t//sed replace>"
#echo "$str"