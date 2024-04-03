in = s.txt
out = t.txt
inEncode = GBK
outEncode = UTF8
replace := replace.txt
# variable := $(shell sed -E ':a; N; $!ba; s/(.+)\n/s\/\1\/g; /gm' ${replace})
variable := $(shell sed -z 's/\n/ ; /gm' ${replace})

all: openccWay cat
alt: tongwenWay cat

test:
	echo ${variable};

cat:
	cat 'head.html' ${out} > ${out}.html;
	rm ${out};

tongwenWay: toUTF8 tongwen replace

toUTF8:
	piconv -f ${inEncode} -t ${outEncode} ${in} > ${out};
	./package-node-tongwen/tongwen-cli/bin/tongwen s2t ${out};

tongwen:
	./package-node-tongwen/tongwen-cli/bin/tongwen s2t ${out};

# openccWay: opencc replace
openccWay: cconv replace

cconv:
	echo ${in};
	cconv -f ${inEncode} -t UTF8-TW ${in} -o ${out}

opencc:
	echo ${in};
	piconv -f ${inEncode} -t ${outEncode} ${in} | opencc -c 's2twp.json' -o ${out};
# 	piconv -f ${inEncode} -t ${outEncode} ${in} | opencc -c 's2tw.json' -o ${out};

replace: replaceSpace
	echo 123
	perl -i -pe "${variable}" ./${out};
# 	perl -i -pe 's/玩應/玩意/g ; s/着/著/g ; s/釣魚台/泰山/g ; s/釣魚臺/泰山/g ; s/纔/才/g ; s/豆腐腦/豆花/g ; s/孃/娘/g ; s/質量/品質/g ; s/視頻/影片/g ; s/水平/水準/g ; s/一隻只/一隻隻/g ; s/眼楮/眼睛/g ; s/“/「/g ; s/”/」/g ; s/‘/『/g ; s/’/』/g' ./${out};
# 	perl -i -pe "$(sed -E ':a; N; $!ba; s/(.+)\n/s\/\1\/g; /gm' replace.txt)" ./${out};
# 	echo ${variable}
# 	sed -E ':a; N; $!ba; s/(.+)\n/s\/\1\/g; /gm' replace.txt;
# 	echo "$(sed -E ':a; N; $!ba; s/(.+)\n/s\/\1\/g; /gm' replace.txt)";

# 	perl -i -pe 's/玩應/玩意/g' ./${out};
# 	perl -i -pe 's/釣魚台/泰山/g' ./${out};
# 	perl -i -pe 's/釣魚臺/泰山/g' ./${out};
# 	perl -i -pe 's/纔/才/g' ./${out};
# 	perl -i -pe 's/孃/娘/g' ./${out};
# 	perl -i -pe 's/質量/品質/g' ./${out};
# 	perl -i -pe 's/視頻/影片/g' ./${out};
# 	perl -i -pe 's/水平/水準/g' ./${out};
# 	perl -i -pe 's/一隻只/一隻隻/g' ./${out};
# 	perl -i -pe 's/“/「/g' ./${out};
# 	perl -i -pe 's/”/」/g' ./${out};

replaceSpace:
	perl -i -pe 's/^    //g ; s/^  //g ; s/^　　/\n/g ; s/\r?\n/\n\n/g ; s/^\n{2,}//g ' ./${out};
