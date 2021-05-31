in = s.txt
out = t.txt
inEncode = gbk
outEncode = utf8

# all: tongwenWay
all: openccWay

tongwenWay: toUTF8 tongwen replaceSpace

toUTF8:
	piconv -f ${inEncode} -t ${outEncode} ${in} > ${out};

tongwen:
	tongwen s2t ${out};

openccWay: opencc replace

opencc:
	echo ${in};
	piconv -f ${inEncode} -t ${outEncode} ${in} | opencc -o ${out};

replace: replaceSpace
	perl -i -pe 's/玩應/玩意/g ; s/釣魚台/泰山/g ; s/釣魚臺/泰山/g ; s/纔/才/g ; s/孃/娘/g ; s/質量/品質/g ; s/視頻/影片/g ; s/水平/水準/g ; s/一隻只/一隻隻/g ; s/“/「/g ; s/”/」/g' ./${out};
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
	perl -i -pe 's/^    //g ; s/^  //g ; s/^　　/\n/g' ./${out};
