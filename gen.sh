#!/bin/bash

mdelay=20
counts=()
duration=$2

if [[ -d temp ]]
then
    rm temp/*.*
fi
sounds=($(find . -regex ".*.mp3" -not -regex ".*horror.*" -not -regex ".*tools.*" | shuf -n $1))

for sound in "${sounds[@]}"
do
    echo $sound
    #read -p "enter count: " count
    #counts+=($count)

    
done

#echo "${counts[@]}"
cp sounds/misc/censor1.mp3 temp0.mp3
ffmpeg -hide_banner -loglevel error -y -i temp0.mp3 -ar 44100 -ac 2 temp0.mp3
temps=()
for i in $(seq 0 $(( $1 - 1 )))
do
    echo $i
    sound="${sounds[$i]}"
    echo sound: $sound
    r=$(( $i + 1 ))
    fn="temp/temp$r.mp3"
    ffmpeg -hide_banner -loglevel error -y -i $sound -ar 44100 -ac 2 $fn
    if [ $? -ne 0 ]
    then
        echo ffmpeg error, skipping...
        continue
    fi
    
    temps+=($fn)
done

echo "${temps[@]}"
tfn="temp/tfn0.mp3"
cp sounds/misc/censor1.mp3 temp/tfn0.mp3
ffmpeg -hide_banner -loglevel error -y -i $tfn -ar 44100 -ac 2 $tfn

c=1
d=$(soxi -D $tfn | sed 's/\..*//')
echo duration: $d
while [[ $d -lt $duration ]]
do
    i=$(echo "$RANDOM%$1" | bc)
    s="${temps[$i]}"
    echo s: $s
    ttfn="temp/tfn$c.mp3"
    sox -n -r 44100 -c 2 temp/slc.mp3 trim 0 $(echo "$RANDOM%$mdelay" | bc)

    sox $tfn $s temp/slc.mp3 $ttfn
    tfn=$ttfn
    d=$(soxi -D $tfn | sed 's/\..*//')
    echo duration: $d


    c=$(( c + 1 ))
    #read
done

echo $tfn