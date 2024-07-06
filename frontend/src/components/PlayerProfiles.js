import React, { useState, useEffect, useRef } from 'react'
import Header from './Header'
import LeftPanel from './LeftPanel'
import RenderOutput from './RenderOutput'
import './style.css'
import { useNavigate } from 'react-router'

import Title from './Title'
import axiosInstance from '../api/myaxios'

const IPLPointsTable = () => {
	const navigate = useNavigate()
	const [selectedOption, setSelectedOption] = useState("null")
	const [responseItems, setResponseItems] = useState([])
	const [isInputDisabled, setIsInputDisabled] = useState(false)

	const dummy = useRef(null)
	const scrollToBottom = () => {
		dummy.current?.scrollIntoView({ behavior: "smooth" })
	}

	useEffect(() => {
		scrollToBottom()
	}, [responseItems])

	let names = Object.keys({
		"zubair ali": [
			"https: //www.espncricinfo.com/cricketers/zubair-ali-1349366",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"zothanzuala": [
			"https://www.espncricinfo.com/cricketers/zothanzuala-1287045",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bobby zothansanga": [
			"https://www.espncricinfo.com/cricketers/bobby-zothansanga-1164212",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hokaito zhimomi": [
			"https://www.espncricinfo.com/cricketers/hokaito-zhimomi-588471",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"komal zanzad": [
			"https://www.espncricinfo.com/cricketers/komal-zanzad-961195",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304245.jpg"
		],
		"yuvraj singh": [
			"https://www.espncricinfo.com/cricketers/yuvraj-singh-1246442",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/375600/375640.1.png"
		],
		"muvvala yuvan": [
			"https://www.espncricinfo.com/cricketers/muvvala-yuvan-1392220",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karnajit yumnam": [
			"https://www.espncricinfo.com/cricketers/karnajit-yumnam-1201572",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314964.jpg"
		],
		"yugandhar singh": [
			"https://www.espncricinfo.com/cricketers/yugandhar-singh-1252349",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yudhvir singh": [
			"https://www.espncricinfo.com/cricketers/yudhvir-singh-1206052",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314789.jpg"
		],
		"valliappan yudheeswaran": [
			"https://www.espncricinfo.com/cricketers/valliappan-yudheeswaran-1269854",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362570.4.jpg"
		],
		"yokesh kaushik": [
			"https://www.espncricinfo.com/cricketers/yokesh-kaushik-1384942",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sunanda yetrekar": [
			"https://www.espncricinfo.com/cricketers/sunanda-yetrekar-960789",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akavi yeptho": [
			"https://www.espncricinfo.com/cricketers/akavi-yeptho-1246490",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yathish kumar": [
			"https://www.espncricinfo.com/cricketers/yathish-kumar-1324956",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yashu sharma": [
			"https://www.espncricinfo.com/cricketers/yashu-sharma-854213",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yashpal yadav": [
			"https://www.espncricinfo.com/cricketers/yashpal-yadav-1417343",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash thakur": [
			"https://www.espncricinfo.com/cricketers/yash-thakur-1070196",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356790.1.png"
		],
		"yash dayal": [
			"https://www.espncricinfo.com/cricketers/yash-dayal-1159720",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357400/357416.2.jpg"
		],
		"nabam yapu": [
			"https://www.espncricinfo.com/cricketers/nabam-yapu-1255354",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kamsha yangfo": [
			"https://www.espncricinfo.com/cricketers/kamsha-yangfo-1159758",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurabh yadav": [
			"https://www.espncricinfo.com/cricketers/saurabh-yadav-1384955",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravi yadav": [
			"https://www.espncricinfo.com/cricketers/ravi-yadav-1384946",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pradeep yadav": [
			"https://www.espncricinfo.com/cricketers/pradeep-yadav-1246532",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amod yadav": [
			"https://www.espncricinfo.com/cricketers/amod-yadav-1214404",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299800/299899.1.jpg"
		],
		"vikas yadav": [
			"https://www.espncricinfo.com/cricketers/vikas-yadav-1060351",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281700/281773.jpg"
		],
		"vishal yadav": [
			"https://www.espncricinfo.com/cricketers/vishal-yadav-1409979",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"umesh yadav": [
			"https://www.espncricinfo.com/cricketers/umesh-yadav-376116",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302396.jpg"
		],
		"upendra yadav": [
			"https://www.espncricinfo.com/cricketers/upendra-yadav-732269",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378125.1.png"
		],
		"suryakumar yadav": [
			"https://www.espncricinfo.com/cricketers/suryakumar-yadav-446507",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329343.4.jpg"
		],
		"radha yadav": [
			"https://www.espncricinfo.com/cricketers/radha-yadav-960737",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304548.png"
		],
		"mayank yadav": [
			"https://www.espncricinfo.com/cricketers/mayank-yadav-1339274",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"krishna yadav": [
			"https://www.espncricinfo.com/cricketers/krishna-yadav-1403212",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayant yadav": [
			"https://www.espncricinfo.com/cricketers/jayant-yadav-447587",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356781.1.png"
		],
		"divyanshu yadav": [
			"https://www.espncricinfo.com/cricketers/divyanshu-yadav-1403183",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arth yadav": [
			"https://www.espncricinfo.com/cricketers/arth-yadav-1395886",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yab niya": [
			"https://www.espncricinfo.com/cricketers/yab-niya-1203115",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"washington sundar": [
			"https://www.espncricinfo.com/cricketers/washington-sundar-719715",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362608.1.png"
		],
		"washi ansari": [
			"https://www.espncricinfo.com/cricketers/washi-ansari-1413361",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shamwang wangnao": [
			"https://www.espncricinfo.com/cricketers/shamwang-wangnao-1159813",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hitesh walunj": [
			"https://www.espncricinfo.com/cricketers/hitesh-walunj-714513",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshay wakhare": [
			"https://www.espncricinfo.com/cricketers/akshay-wakhare-269520",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/252700/252770.3.jpg"
		],
		"akshay wadkar": [
			"https://www.espncricinfo.com/cricketers/akshay-wadkar-605360",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kushal wadhwani": [
			"https://www.espncricinfo.com/cricketers/kushal-wadhwani-1057401",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajvir wadhwa": [
			"https://www.espncricinfo.com/cricketers/rajvir-wadhwa-1327714",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nehal wadhera": [
			"https://www.espncricinfo.com/cricketers/nehal-wadhera-1151273",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381387.4.png"
		],
		"vijaykumar vyshak": [
			"https://www.espncricinfo.com/cricketers/vijaykumar-vyshak-777815",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378000/378096.1.png"
		],
		"samarth vyas": [
			"https://www.espncricinfo.com/cricketers/samarth-vyas-853859",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dinesh vrinda": [
			"https://www.espncricinfo.com/cricketers/dinesh-vrinda-1289949",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manan vohra": [
			"https://www.espncricinfo.com/cricketers/manan-vohra-532856",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356788.1.png"
		],
		"vivrant sharma": [
			"https://www.espncricinfo.com/cricketers/vivrant-sharma-1252370",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajendran vivek": [
			"https://www.espncricinfo.com/cricketers/rajendran-vivek-1048825",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362564.4.jpg"
		],
		"vivek singh": [
			"https://www.espncricinfo.com/cricketers/vivek-singh-604573",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/375600/375641.1.png"
		],
		"suresh vishweshwar": [
			"https://www.espncricinfo.com/cricketers/suresh-vishweshwar-1287065",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishvas malik": [
			"https://www.espncricinfo.com/cricketers/vishvas-malik-1287063",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"k vishnu": [
			"https://www.espncricinfo.com/cricketers/k-vishnu-1384931",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishnu vinod": [
			"https://www.espncricinfo.com/cricketers/vishnu-vinod-732293",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357639.4.jpg"
		],
		"vishnu raj": [
			"https://www.espncricinfo.com/cricketers/vishnu-raj-1414147",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishal vaidhya": [
			"https://www.espncricinfo.com/cricketers/vishal-vaidhya-1048865",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362563.4.jpg"
		],
		"vishal khokhar": [
			"https://www.espncricinfo.com/cricketers/vishal-khokhar-1273895",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishal jayswal": [
			"https://www.espncricinfo.com/cricketers/vishal-jayswal-1300576",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"virat singh": [
			"https://www.espncricinfo.com/cricketers/virat-singh-720465",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vipul krishna": [
			"https://www.espncricinfo.com/cricketers/vipul-krishna-1203003",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295700/295714.1.jpg"
		],
		"vipin sharma": [
			"https://www.espncricinfo.com/cricketers/vipin-sharma-1403192",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sp vinod": [
			"https://www.espncricinfo.com/cricketers/sp-vinod-1380132",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362284.4.jpg"
		],
		"vinod kumar": [
			"https://www.espncricinfo.com/cricketers/vinod-kumar-481720",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vinay sagar": [
			"https://www.espncricinfo.com/cricketers/vinay-sagar-1057385",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bodhala kumar": [
			"https://www.espncricinfo.com/cricketers/bodhala-kumar-1324500",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vimal khumar": [
			"https://www.espncricinfo.com/cricketers/vimal-khumar-1269870",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362385.4.jpg"
		],
		"vinayak vikram": [
			"https://www.espncricinfo.com/cricketers/vinayak-vikram-923779",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"marimuthu vikneshwaran": [
			"https://www.espncricinfo.com/cricketers/marimuthu-vikneshwaran-1159742",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vikash vishal": [
			"https://www.espncricinfo.com/cricketers/vikash-vishal-1246458",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vikash singh": [
			"https://www.espncricinfo.com/cricketers/vikash-singh-720469",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vikash kumar": [
			"https://www.espncricinfo.com/cricketers/vikash-kumar-1252341",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vikas mishra": [
			"https://www.espncricinfo.com/cricketers/vikas-mishra-437560",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/149100/149120.jpg"
		],
		"vikas kumar": [
			"https://www.espncricinfo.com/cricketers/vikas-kumar-1418301",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m viju arul": [
			"https://www.espncricinfo.com/cricketers/m-viju-arul-1380127",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362349.4.jpg"
		],
		"pranshu vijayran": [
			"https://www.espncricinfo.com/cricketers/pranshu-vijayran-853113",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tripurana vijay": [
			"https://www.espncricinfo.com/cricketers/tripurana-vijay-1292527",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akula vijay": [
			"https://www.espncricinfo.com/cricketers/akula-vijay-1324512",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vijai raja": [
			"https://www.espncricinfo.com/cricketers/vijai-raja-1273932",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hanuma vihari": [
			"https://www.espncricinfo.com/cricketers/hanuma-vihari-452044",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304197.png"
		],
		"p vignesh": [
			"https://www.espncricinfo.com/cricketers/p-vignesh-1380118",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362384.4.jpg"
		],
		"lakshminarayanan vignesh": [
			"https://www.espncricinfo.com/cricketers/lakshminarayanan-vignesh-419679",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/374400/374416.4.jpg"
		],
		"p vidyuth": [
			"https://www.espncricinfo.com/cricketers/p-vidyuth-1380105",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362569.4.jpg"
		],
		"nakul verma": [
			"https://www.espncricinfo.com/cricketers/nakul-verma-484057",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/153600/153636.1.jpg"
		],
		"sushma verma": [
			"https://www.espncricinfo.com/cricketers/sushma-verma-597821",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304575.png"
		],
		"vinukonda venu": [
			"https://www.espncricinfo.com/cricketers/vinukonda-venu-1324483",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m venkatesh": [
			"https://www.espncricinfo.com/cricketers/m-venkatesh-1197713",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"t veeramani": [
			"https://www.espncricinfo.com/cricketers/t-veeramani-1194940",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362451.4.jpg"
		],
		"siddhesh veer": [
			"https://www.espncricinfo.com/cricketers/siddhesh-veer-1175493",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299000/299095.1.jpg"
		],
		"prashant veer": [
			"https://www.espncricinfo.com/cricketers/prashant-veer-1403197",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ritik vats": [
			"https://www.espncricinfo.com/cricketers/ritik-vats-1413388",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yadla vasu": [
			"https://www.espncricinfo.com/cricketers/yadla-vasu-1324466",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pooja vastrakar": [
			"https://www.espncricinfo.com/cricketers/pooja-vastrakar-883413",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300610.1.jpg"
		],
		"akash vasisht": [
			"https://www.espncricinfo.com/cricketers/akash-vasisht-722597",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314993.jpg"
		],
		"vashudev bareth": [
			"https://www.espncricinfo.com/cricketers/vashudev-bareth-1349363",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivank vashisht": [
			"https://www.espncricinfo.com/cricketers/shivank-vashisht-1164186",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arpit vasavada": [
			"https://www.espncricinfo.com/cricketers/arpit-vasavada-379230",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/175600/175615.jpg"
		],
		"varun chakravarthy": [
			"https://www.espncricinfo.com/cricketers/varun-chakravarthy-1108375",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329347.4.jpg"
		],
		"varun sharma": [
			"https://www.espncricinfo.com/cricketers/varun-sharma-1384940",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aelgani varun goud": [
			"https://www.espncricinfo.com/cricketers/aelgani-varun-goud-1409973",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ahitesh varma": [
			"https://www.espncricinfo.com/cricketers/ahitesh-varma-1287006",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhupathiraju varma": [
			"https://www.espncricinfo.com/cricketers/bhupathiraju-varma-1324507",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"maddila vardhan": [
			"https://www.espncricinfo.com/cricketers/maddila-vardhan-1324505",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tc vanlalremruata": [
			"https://www.espncricinfo.com/cricketers/tc-vanlalremruata-1403160",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"andrew vanlalhruaia": [
			"https://www.espncricinfo.com/cricketers/andrew-vanlalhruaia-1170236",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vamsi krishna": [
			"https://www.espncricinfo.com/cricketers/vamsi-krishna-481043",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vamshi krishna": [
			"https://www.espncricinfo.com/cricketers/vamshi-krishna-1384929",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul vakani": [
			"https://www.espncricinfo.com/cricketers/rahul-vakani-1395864",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaishnavi sharma": [
			"https://www.espncricinfo.com/cricketers/vaishnavi-sharma-1426780",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaisakh chandran": [
			"https://www.espncricinfo.com/cricketers/vaisakh-chandran-1287068",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"devika vaidya": [
			"https://www.espncricinfo.com/cricketers/devika-vaidya-709837",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353967.4.jpg"
		],
		"vaibhav sharma": [
			"https://www.espncricinfo.com/cricketers/vaibhav-sharma-1351795",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rinkesh vaghela": [
			"https://www.espncricinfo.com/cricketers/rinkesh-vaghela-1416321",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nihar vaghela": [
			"https://www.espncricinfo.com/cricketers/nihar-vaghela-1395869",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"luckyraj vaghela": [
			"https://www.espncricinfo.com/cricketers/luckyraj-vaghela-1395910",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"uzair malik": [
			"https://www.espncricinfo.com/cricketers/uzair-malik-1413389",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"utkarsh singh": [
			"https://www.espncricinfo.com/cricketers/utkarsh-singh-1081437",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"robin uthappa": [
			"https://www.espncricinfo.com/cricketers/robin-uthappa-35582",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309200/309247.jpg"
		],
		"jaydev unadkat": [
			"https://www.espncricinfo.com/cricketers/jaydev-unadkat-390484",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302392.jpg"
		],
		"umran malik": [
			"https://www.espncricinfo.com/cricketers/umran-malik-1246528",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356816.1.png"
		],
		"umar nazir mir": [
			"https://www.espncricinfo.com/cricketers/umar-nazir-mir-700169",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nihal ullal": [
			"https://www.espncricinfo.com/cricketers/nihal-ullal-573887",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanveer ul-haq": [
			"https://www.espncricinfo.com/cricketers/tanveer-ul-haq-604555",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315023.jpg"
		],
		"sagar udeshi": [
			"https://www.espncricinfo.com/cricketers/sagar-udeshi-1168743",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tushar singh": [
			"https://www.espncricinfo.com/cricketers/tushar-singh-1327702",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tushar raheja": [
			"https://www.espncricinfo.com/cricketers/tushar-raheja-1151295",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362560.4.jpg"
		],
		"murtaza trunkwala": [
			"https://www.espncricinfo.com/cricketers/murtaza-trunkwala-945685",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gongadi trisha": [
			"https://www.espncricinfo.com/cricketers/gongadi-trisha-1255483",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353200/353257.4.jpg"
		],
		"rahul tripathi": [
			"https://www.espncricinfo.com/cricketers/rahul-tripathi-446763",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356821.1.png"
		],
		"trilok nag": [
			"https://www.espncricinfo.com/cricketers/trilok-nag-1048807",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362559.4.jpg"
		],
		"abhijeet tomar": [
			"https://www.espncricinfo.com/cricketers/abhijeet-tomar-1081183",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338164.4.jpg"
		],
		"prashant tomar": [
			"https://www.espncricinfo.com/cricketers/prashant-tomar-1403190",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anuj tiwary": [
			"https://www.espncricinfo.com/cricketers/anuj-tiwary-1169576",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurabh tiwary": [
			"https://www.espncricinfo.com/cricketers/saurabh-tiwary-35390",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302500/302579.jpg"
		],
		"manoj tiwary": [
			"https://www.espncricinfo.com/cricketers/manoj-tiwary-35565",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302900/302924.jpg"
		],
		"yogesh tiwari": [
			"https://www.espncricinfo.com/cricketers/yogesh-tiwari-1246424",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314759.jpg"
		],
		"soumya tiwari": [
			"https://www.espncricinfo.com/cricketers/soumya-tiwari-1255512",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349800/349875.png"
		],
		"abhishek tiwari": [
			"https://www.espncricinfo.com/cricketers/abhishek-tiwari-1159724",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/280600/280657.1.jpg"
		],
		"agrim tiwari": [
			"https://www.espncricinfo.com/cricketers/agrim-tiwari-1214410",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314986.png"
		],
		"naman tiwari": [
			"https://www.espncricinfo.com/cricketers/naman-tiwari-1408677",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tilak varma": [
			"https://www.espncricinfo.com/cricketers/tilak-varma-1170265",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381392.4.png"
		],
		"tanay thyagarajan": [
			"https://www.espncricinfo.com/cricketers/tanay-thyagarajan-1080008",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381374.4.png"
		],
		"thivagar gopal": [
			"https://www.espncricinfo.com/cricketers/thivagar-gopal-1273893",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"thippa reddy": [
			"https://www.espncricinfo.com/cricketers/thippa-reddy-1392198",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"thennavan nadesan": [
			"https://www.espncricinfo.com/cricketers/thennavan-nadesan-1273873",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lakshay thareja": [
			"https://www.espncricinfo.com/cricketers/lakshay-thareja-930187",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/224400/224457.1.jpg"
		],
		"ashish thapa": [
			"https://www.espncricinfo.com/cricketers/ashish-thapa-1159794",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/280700/280789.1.jpg"
		],
		"avinash thapa": [
			"https://www.espncricinfo.com/cricketers/avinash-thapa-1403179",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek thakuri": [
			"https://www.espncricinfo.com/cricketers/abhishek-thakuri-1126196",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rakesh thakur": [
			"https://www.espncricinfo.com/cricketers/rakesh-thakur-1245402",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314749.png"
		],
		"aayush thakur": [
			"https://www.espncricinfo.com/cricketers/aayush-thakur-1292517",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shardul thakur": [
			"https://www.espncricinfo.com/cricketers/shardul-thakur-475281",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302372.jpg"
		],
		"ravi thakur": [
			"https://www.espncricinfo.com/cricketers/ravi-thakur-1068044",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315168.jpg"
		],
		"saima thakor": [
			"https://www.espncricinfo.com/cricketers/saima-thakor-1255542",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya thakare": [
			"https://www.espncricinfo.com/cricketers/aditya-thakare-1125966",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan tewatiya": [
			"https://www.espncricinfo.com/cricketers/karan-tewatiya-1403204",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul tewatia": [
			"https://www.espncricinfo.com/cricketers/rahul-tewatia-423838",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/184200/184293.jpg"
		],
		"tana teti": [
			"https://www.espncricinfo.com/cricketers/tana-teti-1403176",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"teshi tiku": [
			"https://www.espncricinfo.com/cricketers/teshi-tiku-1301380",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pitta tendulkar": [
			"https://www.espncricinfo.com/cricketers/pitta-tendulkar-1324489",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arjun tendulkar": [
			"https://www.espncricinfo.com/cricketers/arjun-tendulkar-1148776",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357633.4.jpg"
		],
		"tejveer singh": [
			"https://www.espncricinfo.com/cricketers/tejveer-singh-1384958",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pinninti tejaswi": [
			"https://www.espncricinfo.com/cricketers/pinninti-tejaswi-1392229",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"techi sonam": [
			"https://www.espncricinfo.com/cricketers/techi-sonam-1252352",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanaboyina tarun": [
			"https://www.espncricinfo.com/cricketers/sanaboyina-tarun-1252322",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tarun kumar": [
			"https://www.espncricinfo.com/cricketers/tarun-kumar-1413371",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tarun bisht": [
			"https://www.espncricinfo.com/cricketers/tarun-bisht-1413903",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tarique siddique": [
			"https://www.espncricinfo.com/cricketers/tarique-siddique-1166158",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283600/283613.1.jpg"
		],
		"shubham tari": [
			"https://www.espncricinfo.com/cricketers/shubham-tari-1301891",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya tare": [
			"https://www.espncricinfo.com/cricketers/aditya-tare-333904",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308900/308968.png"
		],
		"taranjitsingh dhillon": [
			"https://www.espncricinfo.com/cricketers/taranjitsingh-dhillon-1246857",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tarani sa": [
			"https://www.espncricinfo.com/cricketers/tarani-sa-1246463",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tarang gohel": [
			"https://www.espncricinfo.com/cricketers/tarang-gohel-1299794",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pinninti tapaswi": [
			"https://www.espncricinfo.com/cricketers/pinninti-tapaswi-1201466",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295100/295163.1.jpg"
		],
		"nitin tanwar": [
			"https://www.espncricinfo.com/cricketers/nitin-tanwar-1121603",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281700/281768.jpg"
		],
		"abhishek tanwar": [
			"https://www.espncricinfo.com/cricketers/abhishek-tanwar-714479",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362399.4.jpg"
		],
		"ngurang tana": [
			"https://www.espncricinfo.com/cricketers/ngurang-tana-1292556",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hardik tamore": [
			"https://www.espncricinfo.com/cricketers/hardik-tamore-1212583",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kaushal tambe": [
			"https://www.espncricinfo.com/cricketers/kaushal-tambe-1292512",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338261.4.jpg"
		],
		"pravin tambe": [
			"https://www.espncricinfo.com/cricketers/pravin-tambe-587152",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309081.jpg"
		],
		"palzor tamang": [
			"https://www.espncricinfo.com/cricketers/palzor-tamang-1159796",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/280700/280755.1.jpg"
		],
		"hage tama": [
			"https://www.espncricinfo.com/cricketers/hage-tama-1409958",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"atharva taide": [
			"https://www.espncricinfo.com/cricketers/atharva-taide-1125958",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357000/357037.1.png"
		],
		"tahmeed rahman": [
			"https://www.espncricinfo.com/cricketers/tahmeed-rahman-1159805",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295100/295162.1.jpg"
		],
		"bogapurapu swaroop": [
			"https://www.espncricinfo.com/cricketers/bogapurapu-swaroop-1324960",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"swarajeet das": [
			"https://www.espncricinfo.com/cricketers/swarajeet-das-1168059",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"swapnil singh": [
			"https://www.espncricinfo.com/cricketers/swapnil-singh-232292",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362607.4.jpg"
		],
		"aasirwad swain": [
			"https://www.espncricinfo.com/cricketers/aasirwad-swain-1339040",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suyash sharma": [
			"https://www.espncricinfo.com/cricketers/suyash-sharma-1350792",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357000/357016.1.png"
		],
		"pawan suyal": [
			"https://www.espncricinfo.com/cricketers/pawan-suyal-431213",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/156900/156929.jpg"
		],
		"manav suthar": [
			"https://www.espncricinfo.com/cricketers/manav-suthar-1175426",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286100/286141.1.jpg"
		],
		"susheel kumar": [
			"https://www.espncricinfo.com/cricketers/susheel-kumar-1339020",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav suryavanshi": [
			"https://www.espncricinfo.com/cricketers/vaibhav-suryavanshi-1408688",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"laxmesha suryaprakash": [
			"https://www.espncricinfo.com/cricketers/laxmesha-suryaprakash-419672",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361811.4.jpg"
		],
		"suryansh shedge": [
			"https://www.espncricinfo.com/cricketers/suryansh-shedge-1339698",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"balu surya": [
			"https://www.espncricinfo.com/cricketers/balu-surya-1320753",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362606.4.jpg"
		],
		"suresh kumar": [
			"https://www.espncricinfo.com/cricketers/suresh-kumar-1151289",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362568.4.jpg"
		],
		"p surendiran": [
			"https://www.espncricinfo.com/cricketers/p-surendiran-1216223",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"baskaran surendar": [
			"https://www.espncricinfo.com/cricketers/baskaran-surendar-1216244",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kumar suraj": [
			"https://www.espncricinfo.com/cricketers/kumar-suraj-1206491",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suraj tayam": [
			"https://www.espncricinfo.com/cricketers/suraj-tayam-1206041",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378700/378799.1.png"
		],
		"sunny sandhu": [
			"https://www.espncricinfo.com/cricketers/sunny-sandhu-1320766",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362418.4.jpg"
		],
		"pragash sunilkumar": [
			"https://www.espncricinfo.com/cricketers/pragash-sunilkumar-1324940",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sunil bishnoi": [
			"https://www.espncricinfo.com/cricketers/sunil-bishnoi-1384935",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit singh": [
			"https://www.espncricinfo.com/cricketers/sumit-singh-430486",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit mathur": [
			"https://www.espncricinfo.com/cricketers/sumit-mathur-1409978",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit kumar": [
			"https://www.espncricinfo.com/cricketers/sumit-kumar-820393",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumeet verma": [
			"https://www.espncricinfo.com/cricketers/sumeet-verma-390724",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suman das": [
			"https://www.espncricinfo.com/cricketers/suman-das-1277555",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gouher sultana": [
			"https://www.espncricinfo.com/cricketers/gouher-sultana-263980",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304464.png"
		],
		"sultan karim": [
			"https://www.espncricinfo.com/cricketers/sultan-karim-1159949",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sukhwinder singh": [
			"https://www.espncricinfo.com/cricketers/sukhwinder-singh-1421204",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s sujay": [
			"https://www.espncricinfo.com/cricketers/s-sujay-1048881",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362567.4.jpg"
		],
		"p sugendhiran": [
			"https://www.espncricinfo.com/cricketers/p-sugendhiran-1194946",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/374400/374413.4.jpg"
		],
		"d sugadev": [
			"https://www.espncricinfo.com/cricketers/d-sugadev-1384945",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kodavandla sudharsan": [
			"https://www.espncricinfo.com/cricketers/kodavandla-sudharsan-1324482",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"d sudhan": [
			"https://www.espncricinfo.com/cricketers/d-sudhan-1380853",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362605.4.jpg"
		],
		"jagadeesha suchith": [
			"https://www.espncricinfo.com/cricketers/jagadeesha-suchith-527663",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309109.png"
		],
		"karan suchak": [
			"https://www.espncricinfo.com/cricketers/karan-suchak-1395865",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jhathavedh subramanyan": [
			"https://www.espncricinfo.com/cricketers/jhathavedh-subramanyan-919531",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361882.4.jpg"
		],
		"k subramaniyan": [
			"https://www.espncricinfo.com/cricketers/k-subramaniyan-350877",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"subrahmanyam sarma": [
			"https://www.espncricinfo.com/cricketers/subrahmanyam-sarma-1273881",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"cheepurapalli stephen": [
			"https://www.espncricinfo.com/cricketers/cheepurapalli-stephen-679589",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314832.jpg"
		],
		"akshay srinivasan": [
			"https://www.espncricinfo.com/cricketers/akshay-srinivasan-1048767",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362235.4.jpg"
		],
		"sirla srinivas": [
			"https://www.espncricinfo.com/cricketers/sirla-srinivas-526386",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sri neranjan": [
			"https://www.espncricinfo.com/cricketers/sri-neranjan-1269879",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361810.1.png"
		],
		"sri abisek": [
			"https://www.espncricinfo.com/cricketers/sri-abisek-1380124",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362604.4.jpg"
		],
		"sreesanth": [
			"https://www.espncricinfo.com/cricketers/sreesanth-34274",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/128400/128482.1.jpg"
		],
		"thota saran": [
			"https://www.espncricinfo.com/cricketers/thota-saran-1392211",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sourav dey": [
			"https://www.espncricinfo.com/cricketers/sourav-dey-1403187",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sourabh muttur": [
			"https://www.espncricinfo.com/cricketers/sourabh-muttur-1392251",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"soyeb sopariya": [
			"https://www.espncricinfo.com/cricketers/soyeb-sopariya-1167968",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sonu yadav": [
			"https://www.espncricinfo.com/cricketers/sonu-yadav-1048867",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361808.1.png"
		],
		"likha sonia": [
			"https://www.espncricinfo.com/cricketers/likha-sonia-1409959",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya somanna": [
			"https://www.espncricinfo.com/cricketers/aditya-somanna-778965",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prashant solanki": [
			"https://www.espncricinfo.com/cricketers/prashant-solanki-1252337",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356836.1.png"
		],
		"vishnu solanki": [
			"https://www.espncricinfo.com/cricketers/vishnu-solanki-604593",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315800/315856.jpg"
		],
		"sagar solanki": [
			"https://www.espncricinfo.com/cricketers/sagar-solanki-1350772",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramesh solanki": [
			"https://www.espncricinfo.com/cricketers/ramesh-solanki-1419281",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jainik solanki": [
			"https://www.espncricinfo.com/cricketers/jainik-solanki-1395882",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"asha sobhana": [
			"https://www.espncricinfo.com/cricketers/asha-sobhana-550687",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377800/377859.1.png"
		],
		"smit patel": [
			"https://www.espncricinfo.com/cricketers/smit-patel-1319106",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/340800/340884.png"
		],
		"r smaran": [
			"https://www.espncricinfo.com/cricketers/r-smaran-1327722",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sivamurugan murugaiyan": [
			"https://www.espncricinfo.com/cricketers/sivamurugan-murugaiyan-1273892",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chirag sisodiya": [
			"https://www.espncricinfo.com/cricketers/chirag-sisodiya-1395893",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parunika sisodia": [
			"https://www.espncricinfo.com/cricketers/parunika-sisodia-1289559",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"luvnith sisodia": [
			"https://www.espncricinfo.com/cricketers/luvnith-sisodia-1155253",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"malliksab sirur": [
			"https://www.espncricinfo.com/cricketers/malliksab-sirur-1083850",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shekar sirohi": [
			"https://www.espncricinfo.com/cricketers/shekar-sirohi-1419279",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arkaprabha sinha": [
			"https://www.espncricinfo.com/cricketers/arkaprabha-sinha-1202928",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"myendung singpho": [
			"https://www.espncricinfo.com/cricketers/myendung-singpho-1159761",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav singh": [
			"https://www.espncricinfo.com/cricketers/vaibhav-singh-1324977",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kishan thokchom": [
			"https://www.espncricinfo.com/cricketers/kishan-thokchom-1163690",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314967.jpg"
		],
		"rex rajkumar": [
			"https://www.espncricinfo.com/cricketers/rex-rajkumar-1159940",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314977.jpg"
		],
		"prafullomani singh": [
			"https://www.espncricinfo.com/cricketers/prafullomani-singh-1159943",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314976.jpg"
		],
		"pheiroijam jotin": [
			"https://www.espncricinfo.com/cricketers/pheiroijam-jotin-1344410",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lamabam singh": [
			"https://www.espncricinfo.com/cricketers/lamabam-singh-1175444",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314955.jpg"
		],
		"kangabam priyojit": [
			"https://www.espncricinfo.com/cricketers/kangabam-priyojit-1159951",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harsh singh": [
			"https://www.espncricinfo.com/cricketers/harsh-singh-1166195",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"adarsh singh": [
			"https://www.espncricinfo.com/cricketers/adarsh-singh-1408678",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"virendra singh": [
			"https://www.espncricinfo.com/cricketers/virendra-singh-1384948",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vinay singh": [
			"https://www.espncricinfo.com/cricketers/vinay-singh-1384926",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishwanath singh": [
			"https://www.espncricinfo.com/cricketers/vishwanath-singh-1354639",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381380.4.png"
		],
		"vikas singh": [
			"https://www.espncricinfo.com/cricketers/vikas-singh-1403169",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sidak singh": [
			"https://www.espncricinfo.com/cricketers/sidak-singh-851271",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rinku singh": [
			"https://www.espncricinfo.com/cricketers/rinku-singh-723105",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338171.4.jpg"
		],
		"paramjeet singh": [
			"https://www.espncricinfo.com/cricketers/paramjeet-singh-1403208",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"piyush singh": [
			"https://www.espncricinfo.com/cricketers/piyush-singh-1175477",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286100/286146.1.jpg"
		],
		"aditya singh": [
			"https://www.espncricinfo.com/cricketers/aditya-singh-1403202",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nishant sindhu": [
			"https://www.espncricinfo.com/cricketers/nishant-sindhu-1292506",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338260.4.jpg"
		],
		"simarjeet singh": [
			"https://www.espncricinfo.com/cricketers/simarjeet-singh-1159722",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356835.1.png"
		],
		"ragupathy silambarasan": [
			"https://www.espncricinfo.com/cricketers/ragupathy-silambarasan-1048853",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362283.4.jpg"
		],
		"m silambarasan": [
			"https://www.espncricinfo.com/cricketers/m-silambarasan-1048829",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362348.4.jpg"
		],
		"mayank sidhu": [
			"https://www.espncricinfo.com/cricketers/mayank-sidhu-1133808",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nafees siddique": [
			"https://www.espncricinfo.com/cricketers/nafees-siddique-1215353",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manimaran siddharth": [
			"https://www.espncricinfo.com/cricketers/manimaran-siddharth-1151286",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/330900/330975.4.jpg"
		],
		"krishnamurthy siddharth": [
			"https://www.espncricinfo.com/cricketers/krishnamurthy-siddharth-573889",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chennu siddhardha": [
			"https://www.espncricinfo.com/cricketers/chennu-siddhardha-1324491",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"siddhant sharma": [
			"https://www.espncricinfo.com/cricketers/siddhant-sharma-1106069",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m siddarth naidu": [
			"https://www.espncricinfo.com/cricketers/m-siddarth-naidu-1324963",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"r sibi": [
			"https://www.espncricinfo.com/cricketers/r-sibi-1380126",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362346.4.jpg"
		],
		"mewada shylla": [
			"https://www.espncricinfo.com/cricketers/mewada-shylla-1403152",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gonnabattula shyam sundar": [
			"https://www.espncricinfo.com/cricketers/gonnabattula-shyam-sundar-1324469",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul shukla": [
			"https://www.espncricinfo.com/cricketers/rahul-shukla-390547",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aaradhya shukla": [
			"https://www.espncricinfo.com/cricketers/aaradhya-shukla-1408680",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubman gill": [
			"https://www.espncricinfo.com/cricketers/shubman-gill-1070173",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312153.jpg"
		],
		"shubham singh": [
			"https://www.espncricinfo.com/cricketers/shubham-singh-1122497",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314917.jpg"
		],
		"shubham sharma": [
			"https://www.espncricinfo.com/cricketers/shubham-sharma-1405633",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham chaudhary": [
			"https://www.espncricinfo.com/cricketers/shubham-chaudhary-1309657",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham arora": [
			"https://www.espncricinfo.com/cricketers/shubham-arora-1132064",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/339300/339311.1.jpg"
		],
		"satheesh shubha": [
			"https://www.espncricinfo.com/cricketers/satheesh-shubha-1255499",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya shrivastava": [
			"https://www.espncricinfo.com/cricketers/aditya-shrivastava-811749",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shreyansh ghosh": [
			"https://www.espncricinfo.com/cricketers/shreyansh-ghosh-1277561",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shree varshan": [
			"https://www.espncricinfo.com/cricketers/shree-varshan-1324982",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dhruv shorey": [
			"https://www.espncricinfo.com/cricketers/dhruv-shorey-590327",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hrithik shokeen": [
			"https://www.espncricinfo.com/cricketers/hrithik-shokeen-1175423",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357636.4.jpg"
		],
		"shoaib siddiqui": [
			"https://www.espncricinfo.com/cricketers/shoaib-siddiqui-1410347",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shoaib md khan": [
			"https://www.espncricinfo.com/cricketers/shoaib-md-khan-1048863",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314833.jpg"
		],
		"s shivaraj": [
			"https://www.espncricinfo.com/cricketers/s-shivaraj-1155387",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mb shivam": [
			"https://www.espncricinfo.com/cricketers/mb-shivam-1392185",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivam singh": [
			"https://www.espncricinfo.com/cricketers/shivam-singh-1380113",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381367.4.png"
		],
		"shivam sharma": [
			"https://www.espncricinfo.com/cricketers/shivam-sharma-1175490",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivam mavi": [
			"https://www.espncricinfo.com/cricketers/shivam-mavi-1079848",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338173.4.jpg"
		],
		"bu shivakumar": [
			"https://www.espncricinfo.com/cricketers/bu-shivakumar-1327701",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shiva singh": [
			"https://www.espncricinfo.com/cricketers/shiva-singh-1070194",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271800/271891.jpg"
		],
		"m shiva shankar": [
			"https://www.espncricinfo.com/cricketers/m-shiva-shankar-1384950",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dhanraj shinde": [
			"https://www.espncricinfo.com/cricketers/dhanraj-shinde-1403155",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"advith shetty": [
			"https://www.espncricinfo.com/cricketers/advith-shetty-1393542",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sankalp shettennavar": [
			"https://www.espncricinfo.com/cricketers/sankalp-shettennavar-1155259",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"atit sheth": [
			"https://www.espncricinfo.com/cricketers/atit-sheth-652361",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179400/179451.1.jpg"
		],
		"galpo sherpa": [
			"https://www.espncricinfo.com/cricketers/galpo-sherpa-1403193",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shashank shekhar": [
			"https://www.espncricinfo.com/cricketers/shashank-shekhar-1413384",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prithvi shaw": [
			"https://www.espncricinfo.com/cricketers/prithvi-shaw-1070168",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356848.1.png"
		],
		"shashi kumar": [
			"https://www.espncricinfo.com/cricketers/shashi-kumar-1327726",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vinodkumar shashank": [
			"https://www.espncricinfo.com/cricketers/vinodkumar-shashank-1324974",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shashank singh": [
			"https://www.espncricinfo.com/cricketers/shashank-singh-377534",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380695.4.png"
		],
		"shivalik sharma": [
			"https://www.espncricinfo.com/cricketers/shivalik-sharma-1167965",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381386.4.png"
		],
		"shivansh sharma": [
			"https://www.espncricinfo.com/cricketers/shivansh-sharma-1106109",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul sharma": [
			"https://www.espncricinfo.com/cricketers/rahul-sharma-272994",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302500/302575.jpg"
		],
		"priyanka sharma": [
			"https://www.espncricinfo.com/cricketers/priyanka-sharma-960827",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nandani sharma": [
			"https://www.espncricinfo.com/cricketers/nandani-sharma-1289676",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan sharma": [
			"https://www.espncricinfo.com/cricketers/karan-sharma-1246518",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357400/357412.3.jpg"
		],
		"jeetendra sharma": [
			"https://www.espncricinfo.com/cricketers/jeetendra-sharma-1344402",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bharat sharma": [
			"https://www.espncricinfo.com/cricketers/bharat-sharma-1273854",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhinav sharma": [
			"https://www.espncricinfo.com/cricketers/abhinav-sharma-1246448",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ashutosh sharma": [
			"https://www.espncricinfo.com/cricketers/ashutosh-sharma-1131978",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380693.4.png"
		],
		"vanshaj sharma": [
			"https://www.espncricinfo.com/cricketers/vanshaj-sharma-1410595",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sachin sharma": [
			"https://www.espncricinfo.com/cricketers/sachin-sharma-1409956",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"raghu sharma": [
			"https://www.espncricinfo.com/cricketers/raghu-sharma-1122621",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345900/345923.gif"
		],
		"rohit sharma": [
			"https://www.espncricinfo.com/cricketers/rohit-sharma-924355",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/269800/269849.1.jpg"
		],
		"rituraj sharma": [
			"https://www.espncricinfo.com/cricketers/rituraj-sharma-1411621",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit sharma": [
			"https://www.espncricinfo.com/cricketers/mohit-sharma-537119",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307400/307489.png"
		],
		"karn sharma": [
			"https://www.espncricinfo.com/cricketers/karn-sharma-30288",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309104.png"
		],
		"jitesh sharma": [
			"https://www.espncricinfo.com/cricketers/jitesh-sharma-721867",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380689.4.png"
		],
		"ishant sharma": [
			"https://www.espncricinfo.com/cricketers/ishant-sharma-236779",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302388.jpg"
		],
		"himanshu sharma": [
			"https://www.espncricinfo.com/cricketers/himanshu-sharma-1350761",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357624.4.jpg"
		],
		"gokul sharma": [
			"https://www.espncricinfo.com/cricketers/gokul-sharma-34584",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/174200/174245.1.jpg"
		],
		"deepti sharma": [
			"https://www.espncricinfo.com/cricketers/deepti-sharma-597811",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304461.png"
		],
		"arjun sharma": [
			"https://www.espncricinfo.com/cricketers/arjun-sharma-731473",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286100/286135.1.jpg"
		],
		"hs sharath": [
			"https://www.espncricinfo.com/cricketers/hs-sharath-478881",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/198900/198969.jpg"
		],
		"srinivas sharath": [
			"https://www.espncricinfo.com/cricketers/srinivas-sharath-916903",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"br sharath": [
			"https://www.espncricinfo.com/cricketers/br-sharath-917231",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sharan goud": [
			"https://www.espncricinfo.com/cricketers/sharan-goud-1327708",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shantanu mishra": [
			"https://www.espncricinfo.com/cricketers/shantanu-mishra-1122977",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299900/299909.1.jpg"
		],
		"vijay shankar": [
			"https://www.espncricinfo.com/cricketers/vijay-shankar-477021",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289600/289614.1.jpg"
		],
		"ravi shankar": [
			"https://www.espncricinfo.com/cricketers/ravi-shankar-1346012",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bamanbha shangpliang": [
			"https://www.espncricinfo.com/cricketers/bamanbha-shangpliang-1292525",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mayank shandilya": [
			"https://www.espncricinfo.com/cricketers/mayank-shandilya-1301895",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m shajahan": [
			"https://www.espncricinfo.com/cricketers/m-shajahan-1048885",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362419.1.png"
		],
		"naushad shaikh": [
			"https://www.espncricinfo.com/cricketers/naushad-shaikh-699501",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shaik kamil": [
			"https://www.espncricinfo.com/cricketers/shaik-kamil-1392200",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shaik abdulla": [
			"https://www.espncricinfo.com/cricketers/shaik-abdulla-1324465",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m shahrukh khan": [
			"https://www.espncricinfo.com/cricketers/m-shahrukh-khan-719719",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357500/357536.4.jpg"
		],
		"shahbaz ahmed": [
			"https://www.espncricinfo.com/cricketers/shahbaz-ahmed-1159711",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308600/308627.1.jpg"
		],
		"shahanshah ahmad": [
			"https://www.espncricinfo.com/cricketers/shahanshah-ahmad-1413374",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahil shah": [
			"https://www.espncricinfo.com/cricketers/rahil-shah-477161",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362334.4.jpg"
		],
		"pinal shah": [
			"https://www.espncricinfo.com/cricketers/pinal-shah-34282",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/67200/67293.1.jpg"
		],
		"shafali verma": [
			"https://www.espncricinfo.com/cricketers/shafali-verma-1182523",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304562.png"
		],
		"shabnam shakil": [
			"https://www.espncricinfo.com/cricketers/shabnam-shakil-1346683",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352900/352941.4.jpg"
		],
		"harshit sethi": [
			"https://www.espncricinfo.com/cricketers/harshit-sethi-1413377",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yorjum sera": [
			"https://www.espncricinfo.com/cricketers/yorjum-sera-1403174",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ayu sentilemla": [
			"https://www.espncricinfo.com/cricketers/ayu-sentilemla-1255552",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akash sengupta": [
			"https://www.espncricinfo.com/cricketers/akash-sengupta-1079841",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"subhranshu senapati": [
			"https://www.espncricinfo.com/cricketers/subhranshu-senapati-1059577",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356837.1.png"
		],
		"kuldeep sen": [
			"https://www.espncricinfo.com/cricketers/kuldeep-sen-1163695",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378133.1.png"
		],
		"aryaman sen": [
			"https://www.espncricinfo.com/cricketers/aryaman-sen-1252384",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amiangshu sen": [
			"https://www.espncricinfo.com/cricketers/amiangshu-sen-1159788",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nirupam sen": [
			"https://www.espncricinfo.com/cricketers/nirupam-sen-500151",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ekant sen": [
			"https://www.espncricinfo.com/cricketers/ekant-sen-977815",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314995.jpg"
		],
		"nirupam sen chowdhary": [
			"https://www.espncricinfo.com/cricketers/nirupam-sen-chowdhary-489849",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m selvam": [
			"https://www.espncricinfo.com/cricketers/m-selvam-1384952",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"n selva kumaran": [
			"https://www.espncricinfo.com/cricketers/n-selva-kumaran-1194938",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362416.4.jpg"
		],
		"karane sekhar": [
			"https://www.espncricinfo.com/cricketers/karane-sekhar-1384944",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shweta sehrawat": [
			"https://www.espncricinfo.com/cricketers/shweta-sehrawat-1255442",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352900/352936.4.jpg"
		],
		"akhil scaria": [
			"https://www.espncricinfo.com/cricketers/akhil-scaria-1344398",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"divyaansh saxena": [
			"https://www.espncricinfo.com/cricketers/divyaansh-saxena-1175425",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jalaj saxena": [
			"https://www.espncricinfo.com/cricketers/jalaj-saxena-237199",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/151600/151678.jpg"
		],
		"tunish sawkar": [
			"https://www.espncricinfo.com/cricketers/tunish-sawkar-1203282",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bipin saurabh": [
			"https://www.espncricinfo.com/cricketers/bipin-saurabh-1287029",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurabh shekhar": [
			"https://www.espncricinfo.com/cricketers/saurabh-shekhar-1420387",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurabh kumar": [
			"https://www.espncricinfo.com/cricketers/saurabh-kumar-627214",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263600/263629.jpg"
		],
		"satyam dubey": [
			"https://www.espncricinfo.com/cricketers/satyam-dubey-1409954",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"satya tiwari": [
			"https://www.espncricinfo.com/cricketers/satya-tiwari-1413370",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajagopal sathish": [
			"https://www.espncricinfo.com/cricketers/rajagopal-sathish-33870",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362343.4.jpg"
		],
		"sayali satghare": [
			"https://www.espncricinfo.com/cricketers/sayali-satghare-1255540",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sujay sateri": [
			"https://www.espncricinfo.com/cricketers/sujay-sateri-1327723",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kv sasikanth": [
			"https://www.espncricinfo.com/cricketers/kv-sasikanth-852317",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314897.png"
		],
		"uthirasamy sasidev": [
			"https://www.espncricinfo.com/cricketers/uthirasamy-sasidev-1048741",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362342.4.jpg"
		],
		"aditya sarwate": [
			"https://www.espncricinfo.com/cricketers/aditya-sarwate-719717",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sidharth sarmah": [
			"https://www.espncricinfo.com/cricketers/sidharth-sarmah-1209377",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kunal sarma": [
			"https://www.espncricinfo.com/cricketers/kunal-sarma-1403186",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ajay sarkar": [
			"https://www.espncricinfo.com/cricketers/ajay-sarkar-852305",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhijit sarkar": [
			"https://www.espncricinfo.com/cricketers/abhijit-sarkar-625406",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yasin sariba": [
			"https://www.espncricinfo.com/cricketers/yasin-sariba-1126889",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sarfaraz ashraf": [
			"https://www.espncricinfo.com/cricketers/sarfaraz-ashraf-733597",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295700/295713.1.jpg"
		],
		"p saravanan": [
			"https://www.espncricinfo.com/cricketers/p-saravanan-1269877",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362603.4.jpg"
		],
		"saravana kumar": [
			"https://www.espncricinfo.com/cricketers/saravana-kumar-1151300",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362380.7.jpg"
		],
		"sarath kumar": [
			"https://www.espncricinfo.com/cricketers/sarath-kumar-1380117",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362378.4.jpg"
		],
		"anurag sarangi": [
			"https://www.espncricinfo.com/cricketers/anurag-sarangi-722097",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"t saran": [
			"https://www.espncricinfo.com/cricketers/t-saran-1380131",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362281.4.jpg"
		],
		"sanvir singh": [
			"https://www.espncricinfo.com/cricketers/sanvir-singh-1132219",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357500/357584.4.jpg"
		],
		"s santosh shiv": [
			"https://www.espncricinfo.com/cricketers/s-santosh-shiv-1048859",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362340.4.jpg"
		],
		"paras ratnaparkhe": [
			"https://www.espncricinfo.com/cricketers/paras-ratnaparkhe-1273902",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"santosh kumar": [
			"https://www.espncricinfo.com/cricketers/santosh-kumar-1252323",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"santokh singh": [
			"https://www.espncricinfo.com/cricketers/santokh-singh-1327695",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s santhosh kumaran": [
			"https://www.espncricinfo.com/cricketers/s-santhosh-kumaran-1168734",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"elligaram sanketh": [
			"https://www.espncricinfo.com/cricketers/elligaram-sanketh-1288465",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjay raghunath": [
			"https://www.espncricinfo.com/cricketers/sanjay-raghunath-807657",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjay yadav": [
			"https://www.espncricinfo.com/cricketers/sanjay-yadav-1048841",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362338.4.jpg"
		],
		"sanjay sudhagar": [
			"https://www.espncricinfo.com/cricketers/sanjay-sudhagar-1384933",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"himanshu sangwan": [
			"https://www.espncricinfo.com/cricketers/himanshu-sangwan-1201517",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295600/295628.1.jpg"
		],
		"pradeep sangwan": [
			"https://www.espncricinfo.com/cricketers/pradeep-sangwan-279545",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/337400/337448.15.jpg"
		],
		"larry sangma": [
			"https://www.espncricinfo.com/cricketers/larry-sangma-1175448",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dippu sangma": [
			"https://www.espncricinfo.com/cricketers/dippu-sangma-1159786",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300800/300828.jpg"
		],
		"chengkam sangma": [
			"https://www.espncricinfo.com/cricketers/chengkam-sangma-1159784",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"junjun sangma": [
			"https://www.espncricinfo.com/cricketers/junjun-sangma-1345705",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arien sangma": [
			"https://www.espncricinfo.com/cricketers/arien-sangma-1403151",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivang sane": [
			"https://www.espncricinfo.com/cricketers/shivang-sane-1415167",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yara sandeep": [
			"https://www.espncricinfo.com/cricketers/yara-sandeep-1292528",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/346300/346377.png"
		],
		"sandeep warrier": [
			"https://www.espncricinfo.com/cricketers/sandeep-warrier-592735",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357400/357470.3.jpg"
		],
		"sandeep sharma": [
			"https://www.espncricinfo.com/cricketers/sandeep-sharma-438362",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/149100/149117.jpg"
		],
		"krishna sancham": [
			"https://www.espncricinfo.com/cricketers/krishna-sancham-1409962",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurya sanandiya": [
			"https://www.espncricinfo.com/cricketers/saurya-sanandiya-1395878",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanju samson": [
			"https://www.espncricinfo.com/cricketers/sanju-samson-425943",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/318800/318843.jpg"
		],
		"gunivandla sampath kumar": [
			"https://www.espncricinfo.com/cricketers/gunivandla-sampath-kumar-1392216",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sameer rizvi": [
			"https://www.espncricinfo.com/cricketers/sameer-rizvi-1175489",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378000/378091.1.png"
		],
		"sameer ansari": [
			"https://www.espncricinfo.com/cricketers/sameer-ansari-1413357",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prodhan samayita": [
			"https://www.espncricinfo.com/cricketers/prodhan-samayita-1255338",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravikumar samarth": [
			"https://www.espncricinfo.com/cricketers/ravikumar-samarth-474512",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/165900/165901.jpg"
		],
		"samarth singh": [
			"https://www.espncricinfo.com/cricketers/samarth-singh-736417",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295800/295824.1.jpg"
		],
		"samarpit joshi": [
			"https://www.espncricinfo.com/cricketers/samarpit-joshi-1168640",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gadde samanvith": [
			"https://www.espncricinfo.com/cricketers/gadde-samanvith-1392203",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"biplab samantray": [
			"https://www.espncricinfo.com/cricketers/biplab-samantray-430125",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"swastik samal": [
			"https://www.espncricinfo.com/cricketers/swastik-samal-1175445",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"salman nizar": [
			"https://www.espncricinfo.com/cricketers/salman-nizar-826349",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jagarlapudi ram": [
			"https://www.espncricinfo.com/cricketers/jagarlapudi-ram-1324496",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shishir saket": [
			"https://www.espncricinfo.com/cricketers/shishir-saket-1345434",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chetan sakariya": [
			"https://www.espncricinfo.com/cricketers/chetan-sakariya-1131754",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380674.4.jpg"
		],
		"sanjeet sajwan": [
			"https://www.espncricinfo.com/cricketers/sanjeet-sajwan-1420392",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sajeevan sajana": [
			"https://www.espncricinfo.com/cricketers/sajeevan-sajana-960955",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kavuri saiteja": [
			"https://www.espncricinfo.com/cricketers/kavuri-saiteja-1292621",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"palakodeti sairam": [
			"https://www.espncricinfo.com/cricketers/palakodeti-sairam-1079378",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"navdeep saini": [
			"https://www.espncricinfo.com/cricketers/navdeep-saini-700167",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356809.1.png"
		],
		"pradyun saikia": [
			"https://www.espncricinfo.com/cricketers/pradyun-saikia-1403188",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kunal saikia": [
			"https://www.espncricinfo.com/cricketers/kunal-saikia-432227",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/110200/110277.1.jpg"
		],
		"saie sharan": [
			"https://www.espncricinfo.com/cricketers/saie-sharan-1273904",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sai sudharsan": [
			"https://www.espncricinfo.com/cricketers/sai-sudharsan-1151288",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361891.1.png"
		],
		"sai kishore": [
			"https://www.espncricinfo.com/cricketers/sai-kishore-1048739",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362558.4.jpg"
		],
		"sb sai chetan": [
			"https://www.espncricinfo.com/cricketers/sb-sai-chetan-1273946",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sahim hasan": [
			"https://www.espncricinfo.com/cricketers/sahim-hasan-1169611",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283700/283789.1.png"
		],
		"sahil lotra": [
			"https://www.espncricinfo.com/cricketers/sahil-lotra-1300720",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"uday saharan": [
			"https://www.espncricinfo.com/cricketers/uday-saharan-1292511",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishal sahani": [
			"https://www.espncricinfo.com/cricketers/vishal-sahani-1415171",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parth sahani": [
			"https://www.espncricinfo.com/cricketers/parth-sahani-851409",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chandan sahani": [
			"https://www.espncricinfo.com/cricketers/chandan-sahani-1070178",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sahab yuvraj singh": [
			"https://www.espncricinfo.com/cricketers/sahab-yuvraj-singh-1411916",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"wriddhiman saha": [
			"https://www.espncricinfo.com/cricketers/wriddhiman-saha-279810",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302390.jpg"
		],
		"viki saha": [
			"https://www.espncricinfo.com/cricketers/viki-saha-680355",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rizu saha": [
			"https://www.espncricinfo.com/cricketers/rizu-saha-799385",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sagar rana": [
			"https://www.espncricinfo.com/cricketers/sagar-rana-1405336",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"titas sadhu": [
			"https://www.espncricinfo.com/cricketers/titas-sadhu-1255407",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352900/352943.4.jpg"
		],
		"balasubramaniam sachin": [
			"https://www.espncricinfo.com/cricketers/balasubramaniam-sachin-1380104",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361890.4.jpg"
		],
		"sachin kumar": [
			"https://www.espncricinfo.com/cricketers/sachin-kumar-1201552",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295100/295158.1.jpg"
		],
		"sachin baby": [
			"https://www.espncricinfo.com/cricketers/sachin-baby-432783",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281000/281081.1.jpg"
		],
		"sabari sakthivel": [
			"https://www.espncricinfo.com/cricketers/sabari-sakthivel-1273891",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sedezhalie rupero": [
			"https://www.espncricinfo.com/cricketers/sedezhalie-rupero-1159812",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit ruikar": [
			"https://www.espncricinfo.com/cricketers/sumit-ruikar-527291",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314919.jpg"
		],
		"suravi roy": [
			"https://www.espncricinfo.com/cricketers/suravi-roy-961139",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bishal roy": [
			"https://www.espncricinfo.com/cricketers/bishal-roy-1292561",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sibsankar roy": [
			"https://www.espncricinfo.com/cricketers/sibsankar-roy-339950",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anukul roy": [
			"https://www.espncricinfo.com/cricketers/anukul-roy-1079839",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338166.4.jpg"
		],
		"ritwik roy chowdhury": [
			"https://www.espncricinfo.com/cricketers/ritwik-roy-chowdhury-849751",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sunil roul": [
			"https://www.espncricinfo.com/cricketers/sunil-roul-1246465",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramalingam rohit": [
			"https://www.espncricinfo.com/cricketers/ramalingam-rohit-1048835",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362337.4.jpg"
		],
		"gutta rohit": [
			"https://www.espncricinfo.com/cricketers/gutta-rohit-1324472",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohit rayudu": [
			"https://www.espncricinfo.com/cricketers/rohit-rayudu-1083493",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohit kumar": [
			"https://www.espncricinfo.com/cricketers/rohit-kumar-1392190",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"damodaran rohit": [
			"https://www.espncricinfo.com/cricketers/damodaran-rohit-598284",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sarvesh rohilla": [
			"https://www.espncricinfo.com/cricketers/sarvesh-rohilla-1292501",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham rohilla": [
			"https://www.espncricinfo.com/cricketers/shubham-rohilla-824935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362386.1.png"
		],
		"ajay rohera": [
			"https://www.espncricinfo.com/cricketers/ajay-rohera-1126225",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283200/283251.1.jpg"
		],
		"rohan suresh": [
			"https://www.espncricinfo.com/cricketers/rohan-suresh-1246537",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohan naveen": [
			"https://www.espncricinfo.com/cricketers/rohan-naveen-1327704",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jemimah rodrigues": [
			"https://www.espncricinfo.com/cricketers/jemimah-rodrigues-883405",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300608.1.jpg"
		],
		"rocky bhasker": [
			"https://www.espncricinfo.com/cricketers/rocky-bhasker-1269876",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362336.4.jpg"
		],
		"laishram robertson": [
			"https://www.espncricinfo.com/cricketers/laishram-robertson-1404959",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishi raut": [
			"https://www.espncricinfo.com/cricketers/rishi-raut-1384930",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishabh tiwari": [
			"https://www.espncricinfo.com/cricketers/rishabh-tiwari-1059574",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314910.jpg"
		],
		"rishabh mishra": [
			"https://www.espncricinfo.com/cricketers/rishabh-mishra-1287047",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"revanth reddy": [
			"https://www.espncricinfo.com/cricketers/revanth-reddy-1421147",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"renuka singh": [
			"https://www.espncricinfo.com/cricketers/renuka-singh-960853",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329351.5.jpg"
		],
		"remruatdika ralte": [
			"https://www.espncricinfo.com/cricketers/remruatdika-ralte-1287044",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit redkar": [
			"https://www.espncricinfo.com/cricketers/mohit-redkar-1287073",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yerpula reddy": [
			"https://www.espncricinfo.com/cricketers/yerpula-reddy-1324504",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yeddala reddy": [
			"https://www.espncricinfo.com/cricketers/yeddala-reddy-1324467",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"satti reddy": [
			"https://www.espncricinfo.com/cricketers/satti-reddy-1324450",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arundhati reddy": [
			"https://www.espncricinfo.com/cricketers/arundhati-reddy-960867",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304535.png"
		],
		"harishankar reddy": [
			"https://www.espncricinfo.com/cricketers/harishankar-reddy-1131755",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314896.png"
		],
		"kogatam reddy": [
			"https://www.espncricinfo.com/cricketers/kogatam-reddy-1392212",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"allareddi reddy": [
			"https://www.espncricinfo.com/cricketers/allareddi-reddy-1392214",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek reddy": [
			"https://www.espncricinfo.com/cricketers/abhishek-reddy-777743",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prayas ray barman": [
			"https://www.espncricinfo.com/cricketers/prayas-ray-barman-1159712",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shashwat rawat": [
			"https://www.espncricinfo.com/cricketers/shashwat-rawat-1175472",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul rawat": [
			"https://www.espncricinfo.com/cricketers/rahul-rawat-1392194",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pankaj rawat": [
			"https://www.espncricinfo.com/cricketers/pankaj-rawat-1292550",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akhil rawat": [
			"https://www.espncricinfo.com/cricketers/akhil-rawat-1216038",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"divans rawat": [
			"https://www.espncricinfo.com/cricketers/divans-rawat-1414028",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav rawal": [
			"https://www.espncricinfo.com/cricketers/vaibhav-rawal-590325",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/152000/152096.jpg"
		],
		"mopada ravikiran": [
			"https://www.espncricinfo.com/cricketers/mopada-ravikiran-1324506",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravi teja": [
			"https://www.espncricinfo.com/cricketers/ravi-teja-1079377",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314793.jpg"
		],
		"ravi kumar": [
			"https://www.espncricinfo.com/cricketers/ravi-kumar-1277532",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338258.4.jpg"
		],
		"ravi kiran": [
			"https://www.espncricinfo.com/cricketers/ravi-kiran-556514",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314909.jpg"
		],
		"ravi chauhan": [
			"https://www.espncricinfo.com/cricketers/ravi-chauhan-924461",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravi bishnoi": [
			"https://www.espncricinfo.com/cricketers/ravi-bishnoi-1175441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335000/335051.4.jpg"
		],
		"dhruv raval": [
			"https://www.espncricinfo.com/cricketers/dhruv-raval-427518",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/344700/344782.png"
		],
		"punam raut": [
			"https://www.espncricinfo.com/cricketers/punam-raut-360401",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304472.png"
		],
		"abhishek raut": [
			"https://www.espncricinfo.com/cricketers/abhishek-raut-230593",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pankaj raunak": [
			"https://www.espncricinfo.com/cricketers/pankaj-raunak-1301893",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ninad rathva": [
			"https://www.espncricinfo.com/cricketers/ninad-rathva-1126213",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kunal singh rathore": [
			"https://www.espncricinfo.com/cricketers/kunal-singh-rathore-1339031",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"adityarajsinh rathore": [
			"https://www.espncricinfo.com/cricketers/adityarajsinh-rathore-1395889",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harshit rathod": [
			"https://www.espncricinfo.com/cricketers/harshit-rathod-1252330",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash rathod": [
			"https://www.espncricinfo.com/cricketers/yash-rathod-1151269",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rushabh rathod": [
			"https://www.espncricinfo.com/cricketers/rushabh-rathod-1079561",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arjun rathod": [
			"https://www.espncricinfo.com/cricketers/arjun-rathod-1395892",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sachin rathi": [
			"https://www.espncricinfo.com/cricketers/sachin-rathi-1381328",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rasikh salam": [
			"https://www.espncricinfo.com/cricketers/rasikh-salam-1161489",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338170.4.jpg"
		],
		"shaik rasheed": [
			"https://www.espncricinfo.com/cricketers/shaik-rasheed-1292497",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338195.4.jpg"
		],
		"amit ranjan": [
			"https://www.espncricinfo.com/cricketers/amit-ranjan-1395894",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pradosh ranjan paul": [
			"https://www.espncricinfo.com/cricketers/pradosh-ranjan-paul-1108328",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362333.4.jpg"
		],
		"siddhant rana": [
			"https://www.espncricinfo.com/cricketers/siddhant-rana-1395868",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sneh rana": [
			"https://www.espncricinfo.com/cricketers/sneh-rana-556537",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/323300/323312.15.jpg"
		],
		"parswaraj rana": [
			"https://www.espncricinfo.com/cricketers/parswaraj-rana-1395903",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitish rana": [
			"https://www.espncricinfo.com/cricketers/nitish-rana-604527",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380671.4.jpg"
		],
		"himanshu rana": [
			"https://www.espncricinfo.com/cricketers/himanshu-rana-816599",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271900/271902.jpg"
		],
		"arpit rana": [
			"https://www.espncricinfo.com/cricketers/arpit-rana-1414716",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amit rana": [
			"https://www.espncricinfo.com/cricketers/amit-rana-1084472",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rana dutta": [
			"https://www.espncricinfo.com/cricketers/rana-dutta-376462",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramandeep singh": [
			"https://www.espncricinfo.com/cricketers/ramandeep-singh-1079470",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380670.4.jpg"
		],
		"ram arvindh": [
			"https://www.espncricinfo.com/cricketers/ram-arvindh-1269862",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361889.4.jpg"
		],
		"rosiamliana ralte": [
			"https://www.espncricinfo.com/cricketers/rosiamliana-ralte-1252342",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lalhruai ralte": [
			"https://www.espncricinfo.com/cricketers/lalhruai-ralte-1159752",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivkumar rakshith": [
			"https://www.espncricinfo.com/cricketers/shivkumar-rakshith-1057699",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rakshan readdi": [
			"https://www.espncricinfo.com/cricketers/rakshan-readdi-1246438",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314797.jpg"
		],
		"satyanarayana raju": [
			"https://www.espncricinfo.com/cricketers/satyanarayana-raju-1392201",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"penmetsa raju": [
			"https://www.espncricinfo.com/cricketers/penmetsa-raju-1324460",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kalidindi raju": [
			"https://www.espncricinfo.com/cricketers/kalidindi-raju-1324484",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"clement raju": [
			"https://www.espncricinfo.com/cricketers/clement-raju-1392187",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhuvan raju": [
			"https://www.espncricinfo.com/cricketers/bhuvan-raju-1392616",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhimanyusingh rajput": [
			"https://www.espncricinfo.com/cricketers/abhimanyusingh-rajput-1201537",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit rajpoot": [
			"https://www.espncricinfo.com/cricketers/ankit-rajpoot-591650",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308900/308974.jpg"
		],
		"r rajkumar": [
			"https://www.espncricinfo.com/cricketers/r-rajkumar-1048869",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362280.4.jpg"
		],
		"k rajkumar": [
			"https://www.espncricinfo.com/cricketers/k-rajkumar-1269875",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajesh mohanty": [
			"https://www.espncricinfo.com/cricketers/rajesh-mohanty-1159717",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajesh bishnoi": [
			"https://www.espncricinfo.com/cricketers/rajesh-bishnoi-236766",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315019.jpg"
		],
		"rajendran karthikeyan": [
			"https://www.espncricinfo.com/cricketers/rajendran-karthikeyan-1195210",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362408.4.jpg"
		],
		"prasham rajdev": [
			"https://www.espncricinfo.com/cricketers/prasham-rajdev-1395857",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"j rajashekar reddy": [
			"https://www.espncricinfo.com/cricketers/j-rajashekar-reddy-1324959",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajan kumar": [
			"https://www.espncricinfo.com/cricketers/rajan-kumar-1339027",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357625.4.jpg"
		],
		"rajakavi": [
			"https://www.espncricinfo.com/cricketers/rajakavi-1384925",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nidhish rajagopal": [
			"https://www.espncricinfo.com/cricketers/nidhish-rajagopal-981649",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362444.4.jpg"
		],
		"rishav raj": [
			"https://www.espncricinfo.com/cricketers/rishav-raj-1214676",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362800/362855.1.png"
		],
		"harsh raj": [
			"https://www.espncricinfo.com/cricketers/harsh-raj-1246470",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314600/314698.jpg"
		],
		"akash raj": [
			"https://www.espncricinfo.com/cricketers/akash-raj-1246468",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314700.jpg"
		],
		"malay raj": [
			"https://www.espncricinfo.com/cricketers/malay-raj-1214422",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"raj bahadur": [
			"https://www.espncricinfo.com/cricketers/raj-bahadur-604551",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281700/281770.jpg"
		],
		"suresh raina": [
			"https://www.espncricinfo.com/cricketers/suresh-raina-33335",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304224.png"
		],
		"kinara rai": [
			"https://www.espncricinfo.com/cricketers/kinara-rai-1403194",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sai rahul": [
			"https://www.espncricinfo.com/cricketers/sai-rahul-1324743",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dev rahul": [
			"https://www.espncricinfo.com/cricketers/dev-rahul-1194933",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362602.4.jpg"
		],
		"seeram rahul": [
			"https://www.espncricinfo.com/cricketers/seeram-rahul-1392230",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul": [
			"https://www.espncricinfo.com/cricketers/rahul-1381484",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kl rahul": [
			"https://www.espncricinfo.com/cricketers/kl-rahul-422108",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304207.png"
		],
		"rahul tamang": [
			"https://www.espncricinfo.com/cricketers/rahul-tamang-1287081",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul singh": [
			"https://www.espncricinfo.com/cricketers/rahul-singh-1083024",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ajinkya rahane": [
			"https://www.espncricinfo.com/cricketers/ajinkya-rahane-277916",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312159.png"
		],
		"ramachandran ragupathy": [
			"https://www.espncricinfo.com/cricketers/ramachandran-ragupathy-1216245",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"angkrish raghuvanshi": [
			"https://www.espncricinfo.com/cricketers/angkrish-raghuvanshi-1292495",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338256.4.jpg"
		],
		"ramamoorthy ragavan": [
			"https://www.espncricinfo.com/cricketers/ramamoorthy-ragavan-1324952",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"radhakrishnan": [
			"https://www.espncricinfo.com/cricketers/radhakrishnan-1079844",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362550.4.jpg"
		],
		"dharani rabha": [
			"https://www.espncricinfo.com/cricketers/dharani-rabha-1287020",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"qamran iqbal": [
			"https://www.espncricinfo.com/cricketers/qamran-iqbal-1169609",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/340700/340754.png"
		],
		"jyortir purohit": [
			"https://www.espncricinfo.com/cricketers/jyortir-purohit-1395897",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"swarupam purkayastha": [
			"https://www.espncricinfo.com/cricketers/swarupam-purkayastha-339948",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/297700/297728.1.jpg"
		],
		"priya punia": [
			"https://www.espncricinfo.com/cricketers/priya-punia-883391",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324715.4.jpg"
		],
		"shubham pundir": [
			"https://www.espncricinfo.com/cricketers/shubham-pundir-820355",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"cheteshwar pujara": [
			"https://www.espncricinfo.com/cricketers/cheteshwar-pujara-32540",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295200/295261.1.jpg"
		],
		"kashyap prudvi": [
			"https://www.espncricinfo.com/cricketers/kashyap-prudvi-1324981",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kuntrapakam prudhviraj": [
			"https://www.espncricinfo.com/cricketers/kuntrapakam-prudhviraj-1324501",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"priyam ashish": [
			"https://www.espncricinfo.com/cricketers/priyam-ashish-1273858",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prithvi raj": [
			"https://www.espncricinfo.com/cricketers/prithvi-raj-1121579",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prince yadav": [
			"https://www.espncricinfo.com/cricketers/prince-yadav-1300836",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prince choudhary": [
			"https://www.espncricinfo.com/cricketers/prince-choudhary-1412827",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381377.4.png"
		],
		"premraj rajavelu": [
			"https://www.espncricinfo.com/cricketers/premraj-rajavelu-1246535",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohan prem": [
			"https://www.espncricinfo.com/cricketers/rohan-prem-32486",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/225400/225485.jpg"
		],
		"prayash singh": [
			"https://www.espncricinfo.com/cricketers/prayash-singh-1084428",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajarathinam pravin": [
			"https://www.espncricinfo.com/cricketers/rajarathinam-pravin-1324984",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abijith praveen": [
			"https://www.espncricinfo.com/cricketers/abijith-praveen-1411200",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"praveen thakur": [
			"https://www.espncricinfo.com/cricketers/praveen-thakur-1168001",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pratyush kumar": [
			"https://www.espncricinfo.com/cricketers/pratyush-kumar-1083144",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pratika rawal": [
			"https://www.espncricinfo.com/cricketers/pratika-rawal-1319163",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"t prathapraj": [
			"https://www.espncricinfo.com/cricketers/t-prathapraj-1384927",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pratham singh": [
			"https://www.espncricinfo.com/cricketers/pratham-singh-1083464",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338168.4.jpg"
		],
		"prateesh saraswat": [
			"https://www.espncricinfo.com/cricketers/prateesh-saraswat-1384936",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nikhil pratap": [
			"https://www.espncricinfo.com/cricketers/nikhil-pratap-1413364",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"raghuvendra pratap singh": [
			"https://www.espncricinfo.com/cricketers/raghuvendra-pratap-singh-1339037",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/351200/351220.3.jpg"
		],
		"veer pratap singh": [
			"https://www.espncricinfo.com/cricketers/veer-pratap-singh-528967",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314920.jpg"
		],
		"prasidh krishna": [
			"https://www.espncricinfo.com/cricketers/prasidh-krishna-917159",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356808.1.png"
		],
		"prasanth kumar": [
			"https://www.espncricinfo.com/cricketers/prasanth-kumar-481046",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314824.jpg"
		],
		"sankar praad": [
			"https://www.espncricinfo.com/cricketers/sankar-praad-1403196",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"palla prasad": [
			"https://www.espncricinfo.com/cricketers/palla-prasad-1324461",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bijay prasad": [
			"https://www.espncricinfo.com/cricketers/bijay-prasad-1349373",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurav prasad": [
			"https://www.espncricinfo.com/cricketers/saurav-prasad-1403195",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manthan prasad": [
			"https://www.espncricinfo.com/cricketers/manthan-prasad-1413375",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manyala pranith": [
			"https://www.espncricinfo.com/cricketers/manyala-pranith-1071326",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/256000/256010.1.png"
		],
		"pranav bhatia": [
			"https://www.espncricinfo.com/cricketers/pranav-bhatia-1057414",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yarragunta pramod": [
			"https://www.espncricinfo.com/cricketers/yarragunta-pramod-1287008",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pradipta pramanik": [
			"https://www.espncricinfo.com/cricketers/pradipta-pramanik-942651",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aadarsh prajwal": [
			"https://www.espncricinfo.com/cricketers/aadarsh-prajwal-1392183",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pragnay reddy": [
			"https://www.espncricinfo.com/cricketers/pragnay-reddy-1246435",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314795.jpg"
		],
		"sushree dibyadarshini": [
			"https://www.espncricinfo.com/cricketers/sushree-dibyadarshini-602513",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/311800/311849.png"
		],
		"suryakant pradhan": [
			"https://www.espncricinfo.com/cricketers/suryakant-pradhan-605087",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"debabrata pradhan": [
			"https://www.espncricinfo.com/cricketers/debabrata-pradhan-1083876",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300800/300827.jpg"
		],
		"thippeswamy pradeep": [
			"https://www.espncricinfo.com/cricketers/thippeswamy-pradeep-917177",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s pradeep roshan": [
			"https://www.espncricinfo.com/cricketers/s-pradeep-roshan-1384954",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"b prabhu": [
			"https://www.espncricinfo.com/cricketers/b-prabhu-1384934",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vijesh prabhudessai": [
			"https://www.espncricinfo.com/cricketers/vijesh-prabhudessai-1132093",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suyash prabhudessai": [
			"https://www.espncricinfo.com/cricketers/suyash-prabhudessai-1083851",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357630.4.jpg"
		],
		"prabhsimran singh": [
			"https://www.espncricinfo.com/cricketers/prabhsimran-singh-1161024",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352900/352932.4.jpg"
		],
		"ishan porel": [
			"https://www.espncricinfo.com/cricketers/ishan-porel-967603",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271800/271895.jpg"
		],
		"rahul popli": [
			"https://www.espncricinfo.com/cricketers/rahul-popli-1415169",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manogaran pooviarasan": [
			"https://www.espncricinfo.com/cricketers/manogaran-pooviarasan-1273915",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"poonam poonia": [
			"https://www.espncricinfo.com/cricketers/poonam-poonia-924467",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281700/281769.jpg"
		],
		"poonam yadav": [
			"https://www.espncricinfo.com/cricketers/poonam-yadav-630972",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304470.png"
		],
		"trisha poojitha": [
			"https://www.espncricinfo.com/cricketers/trisha-poojitha-1427353",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shradda pokharkar": [
			"https://www.espncricinfo.com/cricketers/shradda-pokharkar-1255517",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m poiyamozhi": [
			"https://www.espncricinfo.com/cricketers/m-poiyamozhi-1108334",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362447.4.jpg"
		],
		"govinda poddar": [
			"https://www.espncricinfo.com/cricketers/govinda-poddar-390734",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299900/299907.1.jpg"
		],
		"piyush joshi": [
			"https://www.espncricinfo.com/cricketers/piyush-joshi-1166910",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315200/315226.jpg"
		],
		"mahesh pithiya": [
			"https://www.espncricinfo.com/cricketers/mahesh-pithiya-1216154",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ganeshan periyaswamy": [
			"https://www.espncricinfo.com/cricketers/ganeshan-periyaswamy-1194932",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362543.4.jpg"
		],
		"sahana pawar": [
			"https://www.espncricinfo.com/cricketers/sahana-pawar-960931",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prasad pawar": [
			"https://www.espncricinfo.com/cricketers/prasad-pawar-1292526",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pavan shah": [
			"https://www.espncricinfo.com/cricketers/pavan-shah-1151276",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vijay pawale": [
			"https://www.espncricinfo.com/cricketers/vijay-pawale-1403156",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"felfel pautu": [
			"https://www.espncricinfo.com/cricketers/felfel-pautu-1256062",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amit paunikar": [
			"https://www.espncricinfo.com/cricketers/amit-paunikar-324444",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/110700/110781.1.jpg"
		],
		"sridam paul": [
			"https://www.espncricinfo.com/cricketers/sridam-paul-1292565",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sourav paul": [
			"https://www.espncricinfo.com/cricketers/sourav-paul-1277565",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sankar paul": [
			"https://www.espncricinfo.com/cricketers/sankar-paul-1246497",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chiranjit paul": [
			"https://www.espncricinfo.com/cricketers/chiranjit-paul-625407",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rakesh pattnaik": [
			"https://www.espncricinfo.com/cricketers/rakesh-pattnaik-1252327",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sandeep pattnaik": [
			"https://www.espncricinfo.com/cricketers/sandeep-pattnaik-1059579",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shreyanka patil": [
			"https://www.espncricinfo.com/cricketers/shreyanka-patil-1289948",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/366300/366335.4.jpg"
		],
		"rohan patil": [
			"https://www.espncricinfo.com/cricketers/rohan-patil-1327710",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vidyadhar patil": [
			"https://www.espncricinfo.com/cricketers/vidyadhar-patil-1155265",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sairaj patil": [
			"https://www.espncricinfo.com/cricketers/sairaj-patil-1079560",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anuja patil": [
			"https://www.espncricinfo.com/cricketers/anuja-patil-578451",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304533.png"
		],
		"rajat patidar": [
			"https://www.espncricinfo.com/cricketers/rajat-patidar-823703",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378000/378081.1.png"
		],
		"tarannum pathan": [
			"https://www.espncricinfo.com/cricketers/tarannum-pathan-960729",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"babashafi pathan": [
			"https://www.espncricinfo.com/cricketers/babashafi-pathan-681783",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yusuf pathan": [
			"https://www.espncricinfo.com/cricketers/yusuf-pathan-32498",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/202700/202769.1.jpg"
		],
		"irfan pathan": [
			"https://www.espncricinfo.com/cricketers/irfan-pathan-32685",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304202.jpg"
		],
		"krishnakant pathak": [
			"https://www.espncricinfo.com/cricketers/krishnakant-pathak-1395872",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"snell patel": [
			"https://www.espncricinfo.com/cricketers/snell-patel-826867",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shen patel": [
			"https://www.espncricinfo.com/cricketers/shen-patel-1344409",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ripal patel": [
			"https://www.espncricinfo.com/cricketers/ripal-patel-1201520",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356826.1.png"
		],
		"nancy patel": [
			"https://www.espncricinfo.com/cricketers/nancy-patel-960723",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kinit patel": [
			"https://www.espncricinfo.com/cricketers/kinit-patel-1349356",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hemang patel": [
			"https://www.espncricinfo.com/cricketers/hemang-patel-1159726",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"urvil patel": [
			"https://www.espncricinfo.com/cricketers/urvil-patel-1131570",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rudra patel": [
			"https://www.espncricinfo.com/cricketers/rudra-patel-1408682",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parthiv patel": [
			"https://www.espncricinfo.com/cricketers/parthiv-patel-32242",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304218.png"
		],
		"munaf patel": [
			"https://www.espncricinfo.com/cricketers/munaf-patel-32965",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304212.png"
		],
		"mitesh patel": [
			"https://www.espncricinfo.com/cricketers/mitesh-patel-1122501",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"monica patel": [
			"https://www.espncricinfo.com/cricketers/monica-patel-1213438",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harshal patel": [
			"https://www.espncricinfo.com/cricketers/harshal-patel-390481",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381373.4.png"
		],
		"hardik patel": [
			"https://www.espncricinfo.com/cricketers/hardik-patel-793915",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"het patel": [
			"https://www.espncricinfo.com/cricketers/het-patel-1070199",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya patel": [
			"https://www.espncricinfo.com/cricketers/aditya-patel-1354078",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"axar patel": [
			"https://www.espncricinfo.com/cricketers/axar-patel-554691",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329344.4.jpg"
		],
		"dhruv patel": [
			"https://www.espncricinfo.com/cricketers/dhruv-patel-1126179",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mamta paswan": [
			"https://www.espncricinfo.com/cricketers/mamta-paswan-1255491",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nuzhat parween": [
			"https://www.espncricinfo.com/cricketers/nuzhat-parween-960973",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304396.png"
		],
		"dipesh parwani": [
			"https://www.espncricinfo.com/cricketers/dipesh-parwani-1403206",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parvez sultan": [
			"https://www.espncricinfo.com/cricketers/parvez-sultan-1246496",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parvez ahmed": [
			"https://www.espncricinfo.com/cricketers/parvez-ahmed-1175460",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parvej musaraf": [
			"https://www.espncricinfo.com/cricketers/parvej-musaraf-1419181",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav parte": [
			"https://www.espncricinfo.com/cricketers/gaurav-parte-1419275",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pavan parmar": [
			"https://www.espncricinfo.com/cricketers/pavan-parmar-1395896",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kishan parmar": [
			"https://www.espncricinfo.com/cricketers/kishan-parmar-1065908",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayveer parmar": [
			"https://www.espncricinfo.com/cricketers/jayveer-parmar-1131608",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suved parkar": [
			"https://www.espncricinfo.com/cricketers/suved-parkar-1199280",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parameeswaran sivaraman": [
			"https://www.espncricinfo.com/cricketers/parameeswaran-sivaraman-1273869",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"riyan parag": [
			"https://www.espncricinfo.com/cricketers/riyan-parag-1079434",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/370900/370934.1.jpg"
		],
		"heramb parab": [
			"https://www.espncricinfo.com/cricketers/heramb-parab-1072450",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vineet panwar": [
			"https://www.espncricinfo.com/cricketers/vineet-panwar-1081526",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanoj panwar": [
			"https://www.espncricinfo.com/cricketers/sanoj-panwar-1417253",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankur panwar": [
			"https://www.espncricinfo.com/cricketers/ankur-panwar-1395867",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishabh pant": [
			"https://www.espncricinfo.com/cricketers/rishabh-pant-931581",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304221.png"
		],
		"pankaj yadav": [
			"https://www.espncricinfo.com/cricketers/pankaj-yadav-1168012",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pankaj singh": [
			"https://www.espncricinfo.com/cricketers/pankaj-singh-32973",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304217.png"
		],
		"bhanu pania": [
			"https://www.espncricinfo.com/cricketers/bhanu-pania-1246530",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"neel pandya": [
			"https://www.espncricinfo.com/cricketers/neel-pandya-1395881",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"krunal pandya": [
			"https://www.espncricinfo.com/cricketers/krunal-pandya-471342",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309070.jpg"
		],
		"hardik pandya": [
			"https://www.espncricinfo.com/cricketers/hardik-pandya-625371",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304201.png"
		],
		"nipun pandita": [
			"https://www.espncricinfo.com/cricketers/nipun-pandita-1246520",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314747.jpg"
		],
		"mayank pandey": [
			"https://www.espncricinfo.com/cricketers/mayank-pandey-1324942",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"krishna pandey": [
			"https://www.espncricinfo.com/cricketers/krishna-pandey-1324975",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aryan pandey": [
			"https://www.espncricinfo.com/cricketers/aryan-pandey-1361028",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akash pandey": [
			"https://www.espncricinfo.com/cricketers/akash-pandey-1246443",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315300/315351.jpg"
		],
		"saumy pandey": [
			"https://www.espncricinfo.com/cricketers/saumy-pandey-1408673",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shikha pandey": [
			"https://www.espncricinfo.com/cricketers/shikha-pandey-442145",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304564.png"
		],
		"prateek pandey": [
			"https://www.espncricinfo.com/cricketers/prateek-pandey-1403165",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manish pandey": [
			"https://www.espncricinfo.com/cricketers/manish-pandey-290630",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302500/302572.jpg"
		],
		"ishwar pandey": [
			"https://www.espncricinfo.com/cricketers/ishwar-pandey-447439",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/209900/209973.1.jpg"
		],
		"akshat pandey": [
			"https://www.espncricinfo.com/cricketers/akshat-pandey-941039",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jay pande": [
			"https://www.espncricinfo.com/cricketers/jay-pande-707031",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"priyank panchal": [
			"https://www.espncricinfo.com/cricketers/priyank-panchal-340062",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suhas pampana": [
			"https://www.espncricinfo.com/cricketers/suhas-pampana-1418282",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ashay palkar": [
			"https://www.espncricinfo.com/cricketers/ashay-palkar-1159730",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283600/283684.1.jpg"
		],
		"rajat paliwal": [
			"https://www.espncricinfo.com/cricketers/rajat-paliwal-538021",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/139400/139450.1.jpg"
		],
		"manish pal": [
			"https://www.espncricinfo.com/cricketers/manish-pal-1246481",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prashant painkra": [
			"https://www.espncricinfo.com/cricketers/prashant-painkra-1403201",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjay pahal": [
			"https://www.espncricinfo.com/cricketers/sanjay-pahal-924007",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suresh padiyachi": [
			"https://www.espncricinfo.com/cricketers/suresh-padiyachi-1395858",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramesh padiyachi": [
			"https://www.espncricinfo.com/cricketers/ramesh-padiyachi-1395904",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"devdutt padikkal": [
			"https://www.espncricinfo.com/cricketers/devdutt-padikkal-1119026",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308600/308625.1.jpg"
		],
		"parvinder awana": [
			"https://www.espncricinfo.com/cricketers/parvinder-awana-323131",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/152400/152489.1.jpg"
		],
		"joshua ozukum": [
			"https://www.espncricinfo.com/cricketers/joshua-ozukum-926651",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vicky ostwal": [
			"https://www.espncricinfo.com/cricketers/vicky-ostwal-1292520",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336900/336901.4.jpg"
		],
		"pragyan ojha": [
			"https://www.espncricinfo.com/cricketers/pragyan-ojha-32130",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302385.jpg"
		],
		"kumar nyompu": [
			"https://www.espncricinfo.com/cricketers/kumar-nyompu-1246479",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315400/315462.jpg"
		],
		"macneil noronha": [
			"https://www.espncricinfo.com/cricketers/macneil-noronha-1327725",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitish kumar reddy": [
			"https://www.espncricinfo.com/cricketers/nitish-kumar-reddy-1175496",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314899.png"
		],
		"nitin yadav": [
			"https://www.espncricinfo.com/cricketers/nitin-yadav-950031",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitin sai yadav": [
			"https://www.espncricinfo.com/cricketers/nitin-sai-yadav-1409974",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitin pranaav": [
			"https://www.espncricinfo.com/cricketers/nitin-pranaav-1324973",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shanmugam nitin kumar": [
			"https://www.espncricinfo.com/cricketers/shanmugam-nitin-kumar-1324945",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"r nithiyananda": [
			"https://www.espncricinfo.com/cricketers/r-nithiyananda-1384943",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitesh thakur": [
			"https://www.espncricinfo.com/cricketers/nitesh-thakur-1324948",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nitesh sedai": [
			"https://www.espncricinfo.com/cricketers/nitesh-sedai-1206053",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314971.jpg"
		],
		"nitesh reddy": [
			"https://www.espncricinfo.com/cricketers/nitesh-reddy-1355464",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saranu nishanth": [
			"https://www.espncricinfo.com/cricketers/saranu-nishanth-1408690",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nischith rao": [
			"https://www.espncricinfo.com/cricketers/nischith-rao-1197702",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dega nischal": [
			"https://www.espncricinfo.com/cricketers/dega-nischal-527367",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"thoudam niruta": [
			"https://www.espncricinfo.com/cricketers/thoudam-niruta-1289975",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek nimavat": [
			"https://www.espncricinfo.com/cricketers/abhishek-nimavat-1395871",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nikin jose": [
			"https://www.espncricinfo.com/cricketers/nikin-jose-918189",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sharman nigrodh": [
			"https://www.espncricinfo.com/cricketers/sharman-nigrodh-1403210",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tamanna nigam": [
			"https://www.espncricinfo.com/cricketers/tamanna-nigam-960969",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nabam nigam": [
			"https://www.espncricinfo.com/cricketers/nabam-nigam-1409960",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"md nidheesh": [
			"https://www.espncricinfo.com/cricketers/md-nidheesh-822703",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"oren ngullie": [
			"https://www.espncricinfo.com/cricketers/oren-ngullie-1159814",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281800/281832.1.jpg"
		],
		"techi neri": [
			"https://www.espncricinfo.com/cricketers/techi-neri-1159763",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281800/281822.1.jpg"
		],
		"abhay negi": [
			"https://www.espncricinfo.com/cricketers/abhay-negi-1159789",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283700/283788.1.jpg"
		],
		"ravinder negi": [
			"https://www.espncricinfo.com/cricketers/ravinder-negi-1403167",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pawan negi": [
			"https://www.espncricinfo.com/cricketers/pawan-negi-530773",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309080.png"
		],
		"mukul negi": [
			"https://www.espncricinfo.com/cricketers/mukul-negi-1403191",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dikshanshu negi": [
			"https://www.espncricinfo.com/cricketers/dikshanshu-negi-777533",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314937.jpg"
		],
		"neelam obi": [
			"https://www.espncricinfo.com/cricketers/neelam-obi-1163661",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/284500/284581.1.jpg"
		],
		"nazim siddiquie": [
			"https://www.espncricinfo.com/cricketers/nazim-siddiquie-1122392",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"varun nayanar": [
			"https://www.espncricinfo.com/cricketers/varun-nayanar-1175421",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nawaz khan": [
			"https://www.espncricinfo.com/cricketers/nawaz-khan-1354298",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"navneet vora": [
			"https://www.espncricinfo.com/cricketers/navneet-vora-1287035",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kiran navgire": [
			"https://www.espncricinfo.com/cricketers/kiran-navgire-1289983",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gneshwar naveen": [
			"https://www.espncricinfo.com/cricketers/gneshwar-naveen-777539",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshdeep nath": [
			"https://www.espncricinfo.com/cricketers/akshdeep-nath-500360",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148400/148407.jpg"
		],
		"t natarajan": [
			"https://www.espncricinfo.com/cricketers/t-natarajan-802575",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315600/315602.jpg"
		],
		"kuzhandaivelu natarajan": [
			"https://www.espncricinfo.com/cricketers/kuzhandaivelu-natarajan-1386897",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"narisingh yadav": [
			"https://www.espncricinfo.com/cricketers/narisingh-yadav-1163689",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314969.jpg"
		],
		"naren reddy": [
			"https://www.espncricinfo.com/cricketers/naren-reddy-604710",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314835.jpg"
		],
		"pulkit narang": [
			"https://www.espncricinfo.com/cricketers/pulkit-narang-714605",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349900/349948.3.jpg"
		],
		"naman sharma": [
			"https://www.espncricinfo.com/cricketers/naman-sharma-1384957",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"naman dhir": [
			"https://www.espncricinfo.com/cricketers/naman-dhir-1287032",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381383.4.png"
		],
		"darshan nalkande": [
			"https://www.espncricinfo.com/cricketers/darshan-nalkande-1111917",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357400/357411.1.jpg"
		],
		"nakul sharma": [
			"https://www.espncricinfo.com/cricketers/nakul-sharma-816727",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karun nair": [
			"https://www.espncricinfo.com/cricketers/karun-nair-398439",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304206.jpg"
		],
		"deepesh nailwal": [
			"https://www.espncricinfo.com/cricketers/deepesh-nailwal-1287013",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prakashika naik": [
			"https://www.espncricinfo.com/cricketers/prakashika-naik-1255537",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nikhil naik": [
			"https://www.espncricinfo.com/cricketers/nikhil-naik-554700",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/204000/204075.jpg"
		],
		"arzan nagwaswalla": [
			"https://www.espncricinfo.com/cricketers/arzan-nagwaswalla-1136213",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jagmohan nagarkoti": [
			"https://www.espncricinfo.com/cricketers/jagmohan-nagarkoti-1409971",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yogesh nagar": [
			"https://www.espncricinfo.com/cricketers/yogesh-nagar-317786",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nagaho chishi": [
			"https://www.espncricinfo.com/cricketers/nagaho-chishi-1201603",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"naga bharath": [
			"https://www.espncricinfo.com/cricketers/naga-bharath-1327734",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shahbaz nadeem": [
			"https://www.espncricinfo.com/cricketers/shahbaz-nadeem-31872",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304188.jpg"
		],
		"nadeem khan": [
			"https://www.espncricinfo.com/cricketers/nadeem-khan-1384923",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nabam tempol": [
			"https://www.espncricinfo.com/cricketers/nabam-tempol-1206040",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nabam abo": [
			"https://www.espncricinfo.com/cricketers/nabam-abo-1301379",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"naarayanan rajkumar": [
			"https://www.espncricinfo.com/cricketers/naarayanan-rajkumar-1324946",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sylvester mylliempdah": [
			"https://www.espncricinfo.com/cricketers/sylvester-mylliempdah-1159783",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"musheer khan": [
			"https://www.espncricinfo.com/cricketers/musheer-khan-1316430",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"musaif ajaz": [
			"https://www.espncricinfo.com/cricketers/musaif-ajaz-1170219",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/284200/284211.1.jpg"
		],
		"k murugavel": [
			"https://www.espncricinfo.com/cricketers/k-murugavel-1384959",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"durga murmu": [
			"https://www.espncricinfo.com/cricketers/durga-murmu-1255489",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manisankar murasingh": [
			"https://www.espncricinfo.com/cricketers/manisankar-murasingh-390730",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"murari kumar": [
			"https://www.espncricinfo.com/cricketers/murari-kumar-1411404",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shams mulani": [
			"https://www.espncricinfo.com/cricketers/shams-mulani-1131607",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357800/357845.4.png"
		],
		"u mukilesh": [
			"https://www.espncricinfo.com/cricketers/u-mukilesh-1048855",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361885.4.jpg"
		],
		"mukhtar hussain": [
			"https://www.espncricinfo.com/cricketers/mukhtar-hussain-1135340",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mukesh kumar": [
			"https://www.espncricinfo.com/cricketers/mukesh-kumar-926851",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/364900/364946.4.jpg"
		],
		"mukesh choudhary": [
			"https://www.espncricinfo.com/cricketers/mukesh-choudhary-1125688",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356834.1.png"
		],
		"muhammed adnan khan": [
			"https://www.espncricinfo.com/cricketers/muhammed-adnan-khan-1151292",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362414.4.jpg"
		],
		"abhishek mrinnal": [
			"https://www.espncricinfo.com/cricketers/abhishek-mrinnal-1417251",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nzanthung mozhui": [
			"https://www.espncricinfo.com/cricketers/nzanthung-mozhui-1246494",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vishant more": [
			"https://www.espncricinfo.com/cricketers/vishant-more-317753",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya more": [
			"https://www.espncricinfo.com/cricketers/aditya-more-1384947",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"monu kumar": [
			"https://www.espncricinfo.com/cricketers/monu-kumar-694209",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309107.png"
		],
		"karaparambil monish": [
			"https://www.espncricinfo.com/cricketers/karaparambil-monish-604714",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362420.4.jpg"
		],
		"monish reddy": [
			"https://www.espncricinfo.com/cricketers/monish-reddy-1327735",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"priyanshu moliya": [
			"https://www.espncricinfo.com/cricketers/priyanshu-moliya-1349357",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mokit hariharan": [
			"https://www.espncricinfo.com/cricketers/mokit-hariharan-1108347",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362413.4.jpg"
		],
		"aman mokhade": [
			"https://www.espncricinfo.com/cricketers/aman-mokhade-1216158",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohsin khan": [
			"https://www.espncricinfo.com/cricketers/mohsin-khan-1132005",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357400/357414.3.jpg"
		],
		"bangalore mohith": [
			"https://www.espncricinfo.com/cricketers/bangalore-mohith-1197704",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit rathee": [
			"https://www.espncricinfo.com/cricketers/mohit-rathee-1349361",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357300/357393.1.png"
		],
		"mohit mittan": [
			"https://www.espncricinfo.com/cricketers/mohit-mittan-1273888",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit ahlawat": [
			"https://www.espncricinfo.com/cricketers/mohit-ahlawat-924377",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281400/281400.jpg"
		],
		"jb mohapatra": [
			"https://www.espncricinfo.com/cricketers/jamala-bhanjan-mohapatra-1421321",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohan prasath": [
			"https://www.espncricinfo.com/cricketers/mohan-prasath-1048871",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362438.4.jpg"
		],
		"mohan doss": [
			"https://www.espncricinfo.com/cricketers/mohan-doss-848505",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohammed mohammed": [
			"https://www.espncricinfo.com/cricketers/mohammed-mohammed-588328",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361884.4.jpg"
		],
		"mohammed taha": [
			"https://www.espncricinfo.com/cricketers/mohammed-taha-777529",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohammed siraj": [
			"https://www.espncricinfo.com/cricketers/mohammed-siraj-940973",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315600/315604.jpg"
		],
		"mohammed shami": [
			"https://www.espncricinfo.com/cricketers/mohammed-shami-481896",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304210.png"
		],
		"mohammed kaif": [
			"https://www.espncricinfo.com/cricketers/mohammed-kaif-1246485",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohammed azharuddeen": [
			"https://www.espncricinfo.com/cricketers/mohammed-azharuddeen-940733",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315186.jpg"
		],
		"mohammad saif": [
			"https://www.espncricinfo.com/cricketers/mohammad-saif-642523",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohammad rafi": [
			"https://www.espncricinfo.com/cricketers/mohammad-rafi-1211043",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/298500/298564.png"
		],
		"mohamed safeequddin": [
			"https://www.espncricinfo.com/cricketers/mohamed-safeequddin-1273914",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohamed amaan": [
			"https://www.espncricinfo.com/cricketers/mohamed-amaan-1408697",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohamed ali": [
			"https://www.espncricinfo.com/cricketers/mohamed-ali-1380109",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362531.4.jpg"
		],
		"moakumzuk tzudir": [
			"https://www.espncricinfo.com/cricketers/moakumzuk-tzudir-1202554",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mitrakanth singh": [
			"https://www.espncricinfo.com/cricketers/mitrakanth-singh-777475",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mitlesh mishra": [
			"https://www.espncricinfo.com/cricketers/mitlesh-mishra-1386798",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"r mithun": [
			"https://www.espncricinfo.com/cricketers/r-mithun-1151290",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362436.4.jpg"
		],
		"sushant mishra": [
			"https://www.espncricinfo.com/cricketers/sushant-mishra-1175457",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanmay mishra": [
			"https://www.espncricinfo.com/cricketers/tanmay-mishra-24790",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/128500/128527.1.jpg"
		],
		"gautam mishra": [
			"https://www.espncricinfo.com/cricketers/gautam-mishra-1392193",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amit mishra": [
			"https://www.espncricinfo.com/cricketers/amit-mishra-31107",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304193.png"
		],
		"darshan misal": [
			"https://www.espncricinfo.com/cricketers/darshan-misal-501345",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/272400/272423.1.jpg"
		],
		"chama milind": [
			"https://www.espncricinfo.com/cricketers/chama-milind-604616",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314809.jpg"
		],
		"pathirikattu midhun": [
			"https://www.espncricinfo.com/cricketers/pathirikattu-midhun-1246499",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sudhesan midhun": [
			"https://www.espncricinfo.com/cricketers/sudhesan-midhun-1131619",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271900/271945.1.jpg"
		],
		"siddharth mhatre": [
			"https://www.espncricinfo.com/cricketers/siddharth-mhatre-1403154",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mona meshram": [
			"https://www.espncricinfo.com/cricketers/mona-meshram-490624",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304468.png"
		],
		"lukman meriwala": [
			"https://www.espncricinfo.com/cricketers/lukman-meriwala-573930",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhargav merai": [
			"https://www.espncricinfo.com/cricketers/bhargav-merai-447454",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ashok menaria": [
			"https://www.espncricinfo.com/cricketers/ashok-menaria-371150",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315011.jpg"
		],
		"raxit mehta": [
			"https://www.espncricinfo.com/cricketers/raxit-mehta-1395866",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"divij mehra": [
			"https://www.espncricinfo.com/cricketers/divij-mehra-1353041",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vashish mehra": [
			"https://www.espncricinfo.com/cricketers/vashish-mehra-1417441",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"meghna singh": [
			"https://www.espncricinfo.com/cricketers/meghna-singh-709839",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329350.4.jpg"
		],
		"sabbhineni meghana": [
			"https://www.espncricinfo.com/cricketers/sabbhineni-meghana-556529",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335100/335141.4.jpg"
		],
		"md saptulla": [
			"https://www.espncricinfo.com/cricketers/md-saptulla-1246523",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315113.1.jpg"
		],
		"mayank mishra": [
			"https://www.espncricinfo.com/cricketers/mayank-mishra-1159774",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315200/315228.jpg"
		],
		"purni maya guruny": [
			"https://www.espncricinfo.com/cricketers/purni-maya-guruny-1255333",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m mathivannan": [
			"https://www.espncricinfo.com/cricketers/m-mathivannan-1269889",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362374.4.jpg"
		],
		"manohar mathavan": [
			"https://www.espncricinfo.com/cricketers/manohar-mathavan-1216246",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"magadevan mathan": [
			"https://www.espncricinfo.com/cricketers/magadevan-mathan-1252375",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mayank markande": [
			"https://www.espncricinfo.com/cricketers/mayank-markande-1081442",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356819.1.png"
		],
		"palanivel mariyappan": [
			"https://www.espncricinfo.com/cricketers/palanivel-mariyappan-1324944",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kilco marak": [
			"https://www.espncricinfo.com/cricketers/kilco-marak-1206026",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manvanth kumar": [
			"https://www.espncricinfo.com/cricketers/manvanth-kumar-1392186",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"unnikrishnan manukrishnan": [
			"https://www.espncricinfo.com/cricketers/unnikrishnan-manukrishnan-423810",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"himanshu mantri": [
			"https://www.espncricinfo.com/cricketers/himanshu-mantri-1210085",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/298100/298133.1.jpg"
		],
		"pathuri manohar": [
			"https://www.espncricinfo.com/cricketers/pathuri-manohar-1324480",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhinav manohar": [
			"https://www.espncricinfo.com/cricketers/abhinav-manohar-778963",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prerak mankad": [
			"https://www.espncricinfo.com/cricketers/prerak-mankad-956871",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378128.1.png"
		],
		"manish golamaru": [
			"https://www.espncricinfo.com/cricketers/manish-golamaru-1159715",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314836.jpg"
		],
		"s manikandan": [
			"https://www.espncricinfo.com/cricketers/s-manikandan-1385000",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayaprakash manikandan": [
			"https://www.espncricinfo.com/cricketers/jayaprakash-manikandan-1246534",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manik beri": [
			"https://www.espncricinfo.com/cricketers/manik-beri-1287030",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s manigandan": [
			"https://www.espncricinfo.com/cricketers/s-manigandan-1151293",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362529.4.jpg"
		],
		"minnu mani": [
			"https://www.espncricinfo.com/cricketers/minnu-mani-960949",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/365700/365717.1.png"
		],
		"mani bharathi": [
			"https://www.espncricinfo.com/cricketers/mani-bharathi-1108337",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362278.4.jpg"
		],
		"thoudam mangalsana": [
			"https://www.espncricinfo.com/cricketers/thoudam-mangalsana-1426789",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"smriti mandhana": [
			"https://www.espncricinfo.com/cricketers/smriti-mandhana-597806",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304569.png"
		],
		"mandeep singh": [
			"https://www.espncricinfo.com/cricketers/mandeep-singh-398506",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356825.1.png"
		],
		"ajay mandal": [
			"https://www.espncricinfo.com/cricketers/ajay-mandal-1059570",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314902.jpg"
		],
		"shoaib manager": [
			"https://www.espncricinfo.com/cricketers/shoaib-manager-340839",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gavvala mallikarjuna": [
			"https://www.espncricinfo.com/cricketers/gavvala-mallikarjuna-1324481",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ranjeet mali": [
			"https://www.espncricinfo.com/cricketers/ranjeet-mali-377754",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283400/283421.1.jpg"
		],
		"salil malhotra": [
			"https://www.espncricinfo.com/cricketers/salil-malhotra-1415163",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anmol malhotra": [
			"https://www.espncricinfo.com/cricketers/anmol-malhotra-851259",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjay majumder": [
			"https://www.espncricinfo.com/cricketers/sanjay-majumder-554336",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sourabh majumdar": [
			"https://www.espncricinfo.com/cricketers/sourabh-majumdar-1246454",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314918.jpg"
		],
		"anustup majumdar": [
			"https://www.espncricinfo.com/cricketers/anustup-majumdar-31750",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"majid khan": [
			"https://www.espncricinfo.com/cricketers/majid-khan-1384938",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mangal mahrour": [
			"https://www.espncricinfo.com/cricketers/mangal-mahrour-1169586",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356897.1.png"
		],
		"marella kumar": [
			"https://www.espncricinfo.com/cricketers/marella-kumar-1324447",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanish mahesh": [
			"https://www.espncricinfo.com/cricketers/tanish-mahesh-1393664",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aashish mahesh": [
			"https://www.espncricinfo.com/cricketers/aashish-mahesh-1392197",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"maheep kumar": [
			"https://www.espncricinfo.com/cricketers/maheep-kumar-1252321",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mandar mahale": [
			"https://www.espncricinfo.com/cricketers/mandar-mahale-1216165",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kunal mahajan": [
			"https://www.espncricinfo.com/cricketers/kunal-mahajan-627592",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"innesh mahajan": [
			"https://www.espncricinfo.com/cricketers/innesh-mahajan-1408672",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akash madhwal": [
			"https://www.espncricinfo.com/cricketers/akash-madhwal-1206039",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381393.4.png"
		],
		"madhava prasad": [
			"https://www.espncricinfo.com/cricketers/madhava-prasad-1408687",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nagullulri madhav": [
			"https://www.espncricinfo.com/cricketers/nagullulri-madhav-1324499",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"m madhav rayudu": [
			"https://www.espncricinfo.com/cricketers/m-madhav-rayudu-1324458",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"madhankumar krishnamurthy": [
			"https://www.espncricinfo.com/cricketers/madhankumar-krishnamurthy-1273901",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"madhan kumar": [
			"https://www.espncricinfo.com/cricketers/madhan-kumar-1320752",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"monica lyngdoh": [
			"https://www.espncricinfo.com/cricketers/monica-lyngdoh-1426788",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vengatesh arjun": [
			"https://www.espncricinfo.com/cricketers/vengatesh-arjun-1324979",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhim luitel": [
			"https://www.espncricinfo.com/cricketers/bhim-luitel-1252382",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prabin luha": [
			"https://www.espncricinfo.com/cricketers/prabin-luha-1206108",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lovekesh bansal": [
			"https://www.espncricinfo.com/cricketers/lovekesh-bansal-854221",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/374200/374225.1.png"
		],
		"ronald longjam": [
			"https://www.espncricinfo.com/cricketers/ronald-longjam-1201542",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lone nasir": [
			"https://www.espncricinfo.com/cricketers/lone-nasir-1252366",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mahipal lomror": [
			"https://www.espncricinfo.com/cricketers/mahipal-lomror-853265",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315015.jpg"
		],
		"suresh lokeshwar": [
			"https://www.espncricinfo.com/cricketers/suresh-lokeshwar-1081440",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lokesh raj": [
			"https://www.espncricinfo.com/cricketers/lokesh-raj-981673",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362329.4.jpg"
		],
		"logesh prabagaran": [
			"https://www.espncricinfo.com/cricketers/logesh-prabagaran-1273887",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"raj limbani": [
			"https://www.espncricinfo.com/cricketers/raj-limbani-1410814",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"james lepcha": [
			"https://www.espncricinfo.com/cricketers/james-lepcha-1246526",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314600/314681.1.jpg"
		],
		"imliwati lemtur": [
			"https://www.espncricinfo.com/cricketers/imliwati-lemtur-1159808",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281800/281836.1.jpg"
		],
		"lekhaz reddy": [
			"https://www.espncricinfo.com/cricketers/lekhaz-reddy-1287007",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lee yong lepcha": [
			"https://www.espncricinfo.com/cricketers/lee-yong-lepcha-1159795",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/365500/365572.1.png"
		],
		"lawrence jawaharraj": [
			"https://www.espncricinfo.com/cricketers/lawrence-jawaharraj-1273912",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhagmender lather": [
			"https://www.espncricinfo.com/cricketers/bhagmender-lather-1246521",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314742.png"
		],
		"lankesh": [
			"https://www.espncricinfo.com/cricketers/lankesh-1393335",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nilesh lamichaney": [
			"https://www.espncricinfo.com/cricketers/nilesh-lamichaney-1159791",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/280700/280753.1.jpg"
		],
		"karan lamba": [
			"https://www.espncricinfo.com/cricketers/karan-lamba-1349367",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhupen lalwani": [
			"https://www.espncricinfo.com/cricketers/bhupen-lalwani-1167982",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"joseph lalthankhuma": [
			"https://www.espncricinfo.com/cricketers/joseph-lalthankhuma-1287040",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"c lalrinsanga": [
			"https://www.espncricinfo.com/cricketers/c-lalrinsanga-1159749",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"b lalnunfela": [
			"https://www.espncricinfo.com/cricketers/b-lalnunfela-1287038",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"f lalmuanzuala": [
			"https://www.espncricinfo.com/cricketers/f-lalmuanzuala-1339019",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lalith mohan": [
			"https://www.espncricinfo.com/cricketers/lalith-mohan-317710",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314733.1.jpg"
		],
		"lalit yadav": [
			"https://www.espncricinfo.com/cricketers/lalit-yadav-930189",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336900/336900.4.jpg"
		],
		"lalhruaizela": [
			"https://www.espncricinfo.com/cricketers/lalhruaizela-1164213",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lalhriatrenga": [
			"https://www.espncricinfo.com/cricketers/lalhriatrenga-1339018",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"g lalbiakvela": [
			"https://www.espncricinfo.com/cricketers/g-lalbiakvela-1159753",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lakshay jain": [
			"https://www.espncricinfo.com/cricketers/lakshay-jain-1381407",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362435.4.jpg"
		],
		"lakhan singh": [
			"https://www.espncricinfo.com/cricketers/lakhan-singh-854329",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296900/296957.jpg"
		],
		"sarabjit ladda": [
			"https://www.espncricinfo.com/cricketers/sarabjit-ladda-317292",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/99200/99201.1.jpg"
		],
		"sunil lachit": [
			"https://www.espncricinfo.com/cricketers/sunil-lachit-1252316",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kushwanth silora": [
			"https://www.espncricinfo.com/cricketers/kushwanth-silora-1324968",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit kushwah": [
			"https://www.espncricinfo.com/cricketers/sumit-kushwah-1417249",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nishant kushwah": [
			"https://www.espncricinfo.com/cricketers/nishant-kushwah-1342030",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349400/349499.gif"
		],
		"kumar kushagra": [
			"https://www.espncricinfo.com/cricketers/kumar-kushagra-1207295",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378131.1.png"
		],
		"sanvert kurkalang": [
			"https://www.espncricinfo.com/cricketers/sanvert-kurkalang-1344392",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohan kunnummal": [
			"https://www.espncricinfo.com/cricketers/rohan-kunnummal-1079382",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kunal yadav": [
			"https://www.espncricinfo.com/cricketers/kunal-yadav-1300838",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"umang kumar": [
			"https://www.espncricinfo.com/cricketers/umang-kumar-1247122",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rakesh kumar": [
			"https://www.espncricinfo.com/cricketers/rakesh-kumar-1214392",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315400/315468.jpg"
		],
		"pankaj kumar": [
			"https://www.espncricinfo.com/cricketers/pankaj-kumar-1210270",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lr kumar": [
			"https://www.espncricinfo.com/cricketers/lr-kumar-1327694",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"boopathi kumar": [
			"https://www.espncricinfo.com/cricketers/boopathi-kumar-1380114",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362358.4.jpg"
		],
		"vivek kumar": [
			"https://www.espncricinfo.com/cricketers/vivek-kumar-1403203",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"santu kumar": [
			"https://www.espncricinfo.com/cricketers/santu-kumar-1417254",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"praveen kumar": [
			"https://www.espncricinfo.com/cricketers/praveen-kumar-30732",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335600/335643.4.jpg"
		],
		"bhuvneshwar kumar": [
			"https://www.espncricinfo.com/cricketers/bhuvneshwar-kumar-326016",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304194.png"
		],
		"aman kumar": [
			"https://www.espncricinfo.com/cricketers/aman-kumar-1413368",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"alok kumar": [
			"https://www.espncricinfo.com/cricketers/alok-kumar-1409980",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dhawal kulkarni": [
			"https://www.espncricinfo.com/cricketers/dhawal-kulkarni-277955",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309063.png"
		],
		"arshin kulkarni": [
			"https://www.espncricinfo.com/cricketers/arshin-kulkarni-1403153",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378126.4.jpg"
		],
		"kuldeep yadav": [
			"https://www.espncricinfo.com/cricketers/kuldeep-yadav-559235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304208.png"
		],
		"miduthuru kulayappa": [
			"https://www.espncricinfo.com/cricketers/miduthuru-kulayappa-1392218",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kshitiz sharma": [
			"https://www.espncricinfo.com/cricketers/kshitiz-sharma-625380",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/287000/287071.1.jpg"
		],
		"kshitij patel": [
			"https://www.espncricinfo.com/cricketers/kshitij-patel-1131609",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anand krishnan": [
			"https://www.espncricinfo.com/cricketers/anand-krishnan-1301889",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"veda krishnamurthy": [
			"https://www.espncricinfo.com/cricketers/veda-krishnamurthy-442205",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304537.png"
		],
		"s krishnakumar": [
			"https://www.espncricinfo.com/cricketers/s-krishnakumar-1384941",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kruthik krishna": [
			"https://www.espncricinfo.com/cricketers/kruthik-krishna-1207298",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"krishna prasad": [
			"https://www.espncricinfo.com/cricketers/krishna-prasad-1339033",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"krish jain": [
			"https://www.espncricinfo.com/cricketers/krish-jain-1320760",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362600/362600.4.jpg"
		],
		"kranthi kumar": [
			"https://www.espncricinfo.com/cricketers/kranthi-kumar-777525",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jagatheesan kousik": [
			"https://www.espncricinfo.com/cricketers/jagatheesan-kousik-923869",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362599.4.jpg"
		],
		"vasuki koushik": [
			"https://www.espncricinfo.com/cricketers/vasuki-koushik-477335",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanush kotian": [
			"https://www.espncricinfo.com/cricketers/tanush-kotian-1125960",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378132.1.png"
		],
		"aezaz kothariya": [
			"https://www.espncricinfo.com/cricketers/aezaz-kothariya-1287037",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash kothari": [
			"https://www.espncricinfo.com/cricketers/yash-kothari-1081525",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315024.jpg"
		],
		"hetvik kotak": [
			"https://www.espncricinfo.com/cricketers/hetvik-kotak-1395879",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bishworjit konthoujam": [
			"https://www.espncricinfo.com/cricketers/bishworjit-konthoujam-1159944",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314956.jpg"
		],
		"virat kohli": [
			"https://www.espncricinfo.com/cricketers/virat-kohli-253802",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289000/289002.1.jpg"
		],
		"krishnan shrijith": [
			"https://www.espncricinfo.com/cricketers/krishnan-shrijith-778241",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"g kishoor": [
			"https://www.espncricinfo.com/cricketers/g-kishoor-1269883",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362371.4.jpg"
		],
		"l kishan singha": [
			"https://www.espncricinfo.com/cricketers/l-kishan-singha-1246507",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314966.jpg"
		],
		"kishan lyngdoh": [
			"https://www.espncricinfo.com/cricketers/kishan-lyngdoh-1287010",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kishan karki": [
			"https://www.espncricinfo.com/cricketers/kishan-karki-1287080",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"roshini kiran": [
			"https://www.espncricinfo.com/cricketers/roshini-kiran-1427352",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kiran akash": [
			"https://www.espncricinfo.com/cricketers/kiran-akash-1048879",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361800/361883.4.jpg"
		],
		"manthan khutkar": [
			"https://www.espncricinfo.com/cricketers/manthan-khutkar-1292564",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chirag khurana": [
			"https://www.espncricinfo.com/cricketers/chirag-khurana-327125",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/152700/152717.jpg"
		],
		"gitansh khera": [
			"https://www.espncricinfo.com/cricketers/gitansh-khera-482312",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354200/354238.gif"
		],
		"poonam khemnar": [
			"https://www.espncricinfo.com/cricketers/poonam-khemnar-1289979",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kulwant khejroliya": [
			"https://www.espncricinfo.com/cricketers/kulwant-khejroliya-1083033",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357000/357018.1.png"
		],
		"onkar khatpe": [
			"https://www.espncricinfo.com/cricketers/onkar-khatpe-1415598",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amandeep khare": [
			"https://www.espncricinfo.com/cricketers/amandeep-khare-942657",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314903.jpg"
		],
		"priyanshu khanduri": [
			"https://www.espncricinfo.com/cricketers/priyanshu-khanduri-977821",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"salman khan": [
			"https://www.espncricinfo.com/cricketers/salman-khan-949205",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315021.jpg"
		],
		"sarfaraz khan": [
			"https://www.espncricinfo.com/cricketers/sarfaraz-khan-642525",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336800/336899.4.jpg"
		],
		"satyam khamrai": [
			"https://www.espncricinfo.com/cricketers/satyam-khamrai-1395908",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham khajuria": [
			"https://www.espncricinfo.com/cricketers/shubham-khajuria-543078",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ranjot khaira": [
			"https://www.espncricinfo.com/cricketers/ranjot-khaira-1277590",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kevin jivrajani": [
			"https://www.espncricinfo.com/cricketers/kevin-jivrajani-1300583",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"eknath kerkar": [
			"https://www.espncricinfo.com/cricketers/eknath-kerkar-706341",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"khrievitso kense": [
			"https://www.espncricinfo.com/cricketers/khrievitso-kense-1246493",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"langlonyamba meitan keishangbam": [
			"https://www.espncricinfo.com/cricketers/langlonyamba-meitan-keishangbam-1201541",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314968.jpg"
		],
		"sathyamoorthy keerthana": [
			"https://www.espncricinfo.com/cricketers/sathyamoorthy-keerthana-961109",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kushang patel": [
			"https://www.espncricinfo.com/cricketers/kushang-patel-591649",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"humaira kazi": [
			"https://www.espncricinfo.com/cricketers/humaira-kazi-961005",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"azim kazi": [
			"https://www.espncricinfo.com/cricketers/azim-kazi-1175442",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anurag kawade": [
			"https://www.espncricinfo.com/cricketers/anurag-kawade-1408685",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"r kavin": [
			"https://www.espncricinfo.com/cricketers/r-kavin-1048831",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362410.4.jpg"
		],
		"vidwath kaverappa": [
			"https://www.espncricinfo.com/cricketers/vidwath-kaverappa-1155262",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381370.4.png"
		],
		"snehal kauthankar": [
			"https://www.espncricinfo.com/cricketers/snehal-kauthankar-826497",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"madhav kaushik": [
			"https://www.espncricinfo.com/cricketers/madhav-kaushik-1163698",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit kaushik": [
			"https://www.espncricinfo.com/cricketers/ankit-kaushik-604532",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kaushik maity": [
			"https://www.espncricinfo.com/cricketers/kaushik-maity-926639",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lavish kaushal": [
			"https://www.espncricinfo.com/cricketers/lavish-kaushal-1119021",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harmanpreet kaur": [
			"https://www.espncricinfo.com/cricketers/harmanpreet-kaur-372317",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304466.png"
		],
		"amanjot kaur": [
			"https://www.espncricinfo.com/cricketers/amanjot-kaur-1255411",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"siddarth kaul": [
			"https://www.espncricinfo.com/cricketers/siddarth-kaul-326017",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309092.png"
		],
		"kathan patel": [
			"https://www.espncricinfo.com/cricketers/kathan-patel-1136212",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"suraj kashyap": [
			"https://www.espncricinfo.com/cricketers/suraj-kashyap-1246474",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314600/314693.jpg"
		],
		"vishu kashyap": [
			"https://www.espncricinfo.com/cricketers/vishu-kashyap-1403215",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mannat kashyap": [
			"https://www.espncricinfo.com/cricketers/mannat-kashyap-1346682",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352900/352939.4.jpg"
		],
		"happy kashyap": [
			"https://www.espncricinfo.com/cricketers/happy-kashyap-1409961",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"disha kasat": [
			"https://www.espncricinfo.com/cricketers/disha-kasat-961183",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"alliraj karuppusamy": [
			"https://www.espncricinfo.com/cricketers/alliraj-karuppusamy-1269855",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362528.4.jpg"
		],
		"kumar kartikeya": [
			"https://www.espncricinfo.com/cricketers/kumar-kartikeya-1159843",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357637.4.jpg"
		],
		"kartikeya kak": [
			"https://www.espncricinfo.com/cricketers/kartikeya-kak-1131963",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314805.jpg"
		],
		"kartik tyagi": [
			"https://www.espncricinfo.com/cricketers/kartik-tyagi-1122918",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299800/299848.1.jpg"
		],
		"udayanarayanan karthiraja": [
			"https://www.espncricinfo.com/cricketers/udayanarayanan-karthiraja-1324983",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayasundaram karthikeyan": [
			"https://www.espncricinfo.com/cricketers/jayasundaram-karthikeyan-1273900",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s karthik": [
			"https://www.espncricinfo.com/cricketers/s-karthik-1048749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362598.4.jpg"
		],
		"su karthik": [
			"https://www.espncricinfo.com/cricketers/su-karthik-1394173",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dinesh karthik": [
			"https://www.espncricinfo.com/cricketers/dinesh-karthik-30045",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304195.png"
		],
		"codanda ajit karthik": [
			"https://www.espncricinfo.com/cricketers/codanda-ajit-karthik-779449",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karthik raman": [
			"https://www.espncricinfo.com/cricketers/karthik-raman-952857",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314837.jpg"
		],
		"karthik b nair": [
			"https://www.espncricinfo.com/cricketers/karthik-b-nair-1273911",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karthick manikandan": [
			"https://www.espncricinfo.com/cricketers/karthick-manikandan-1320762",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362433.4.jpg"
		],
		"akshay karnewar": [
			"https://www.espncricinfo.com/cricketers/akshay-karnewar-528730",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pranav karia": [
			"https://www.espncricinfo.com/cricketers/pranav-karia-1395880",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jesal karia": [
			"https://www.espncricinfo.com/cricketers/jesal-karia-340061",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/226900/226985.1.jpg"
		],
		"akash kargave": [
			"https://www.espncricinfo.com/cricketers/akash-kargave-1273948",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan shinde": [
			"https://www.espncricinfo.com/cricketers/karan-shinde-956035",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan patel": [
			"https://www.espncricinfo.com/cricketers/karan-patel-1395854",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan lal": [
			"https://www.espncricinfo.com/cricketers/karan-lal-1175495",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan kannan": [
			"https://www.espncricinfo.com/cricketers/karan-kannan-1384924",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"karan kaila": [
			"https://www.espncricinfo.com/cricketers/karan-kaila-694213",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179400/179453.1.jpg"
		],
		"kunal karamchandani": [
			"https://www.espncricinfo.com/cricketers/kunal-karamchandani-1246433",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanuja kanwar": [
			"https://www.espncricinfo.com/cricketers/tanuja-kanwar-960847",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304244.jpg"
		],
		"rashi kanojiya": [
			"https://www.espncricinfo.com/cricketers/rashi-kanojiya-1213233",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"neyan shyam kangayan": [
			"https://www.espncricinfo.com/cricketers/neyan-shyam-kangayan-1194942",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav kandpal": [
			"https://www.espncricinfo.com/cricketers/vaibhav-kandpal-1175424",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hiten kanbi": [
			"https://www.espncricinfo.com/cricketers/hiten-kanbi-1395907",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aum kanabar": [
			"https://www.espncricinfo.com/cricketers/aum-kanabar-1292523",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anshul kamboj": [
			"https://www.espncricinfo.com/cricketers/anshul-kamboj-1175428",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380682.5.png"
		],
		"sk kamaruddin": [
			"https://www.espncricinfo.com/cricketers/sk-kamaruddin-1083832",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/259500/259532.1.jpg"
		],
		"g kamalini": [
			"https://www.espncricinfo.com/cricketers/g-kamalini-1427355",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kamaleeshwaran ambikapathy": [
			"https://www.espncricinfo.com/cricketers/kamaleeshwaran-ambikapathy-1273866",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kamal singh": [
			"https://www.espncricinfo.com/cricketers/kamal-singh-1216041",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit kalsi": [
			"https://www.espncricinfo.com/cricketers/ankit-kalsi-722601",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jintimani kalita": [
			"https://www.espncricinfo.com/cricketers/jintimani-kalita-1255387",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hritik kalia": [
			"https://www.espncricinfo.com/cricketers/hritik-kalia-1403189",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit kale": [
			"https://www.espncricinfo.com/cricketers/mohit-kale-1159710",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sonal kalal": [
			"https://www.espncricinfo.com/cricketers/sonal-kalal-1255571",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s kalaivanan": [
			"https://www.espncricinfo.com/cricketers/s-kalaivanan-1387132",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kartik kakade": [
			"https://www.espncricinfo.com/cricketers/kartik-kakade-1125568",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohammad kaif": [
			"https://www.espncricinfo.com/cricketers/mohammad-kaif-29990",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302400/302496.jpg"
		],
		"yash kadam": [
			"https://www.espncricinfo.com/cricketers/yash-kadam-1409965",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohan kadam": [
			"https://www.espncricinfo.com/cricketers/rohan-kadam-777739",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kabir patel": [
			"https://www.espncricinfo.com/cricketers/kabir-patel-1395873",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jyotsnil singh": [
			"https://www.espncricinfo.com/cricketers/jyotsnil-singh-1125567",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aryan juyal": [
			"https://www.espncricinfo.com/cricketers/aryan-juyal-1130300",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271900/271903.jpg"
		],
		"dhruv jurel": [
			"https://www.espncricinfo.com/cricketers/dhruv-jurel-1175488",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338190.4.jpg"
		],
		"jullian jacab": [
			"https://www.espncricinfo.com/cricketers/jullian-jacab-1273899",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mansi joshi": [
			"https://www.espncricinfo.com/cricketers/mansi-joshi-960815",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304395.png"
		],
		"nabam joshi": [
			"https://www.espncricinfo.com/cricketers/nabam-joshi-1403177",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"niket joshi": [
			"https://www.espncricinfo.com/cricketers/niket-joshi-1395916",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"adarsh joshi": [
			"https://www.espncricinfo.com/cricketers/adarsh-joshi-1415174",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aniruddha joshi": [
			"https://www.espncricinfo.com/cricketers/aniruddha-joshi-420644",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sijomon joseph": [
			"https://www.espncricinfo.com/cricketers/sijomon-joseph-1081443",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jonty sidhu": [
			"https://www.espncricinfo.com/cricketers/jonty-sidhu-1081438",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rongsen jonathan": [
			"https://www.espncricinfo.com/cricketers/rongsen-jonathan-424176",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281800/281828.1.jpg"
		],
		"dibakar johri": [
			"https://www.espncricinfo.com/cricketers/dibakar-johri-1414825",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"johnson singh": [
			"https://www.espncricinfo.com/cricketers/johnson-singh-1201539",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chitikela jogesh": [
			"https://www.espncricinfo.com/cricketers/chitikela-jogesh-1324443",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jiwanjot singh": [
			"https://www.espncricinfo.com/cricketers/jiwanjot-singh-586985",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/152700/152782.1.jpg"
		],
		"vandit jivrajani": [
			"https://www.espncricinfo.com/cricketers/vandit-jivrajani-853865",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jitendra kumar": [
			"https://www.espncricinfo.com/cricketers/jitendra-kumar-1269878",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sepichem jingru": [
			"https://www.espncricinfo.com/cricketers/sepichem-jingru-1403205",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"desai jimitkumar": [
			"https://www.espncricinfo.com/cricketers/desai-jimitkumar-1417252",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek jhunjhunwala": [
			"https://www.espncricinfo.com/cricketers/abhishek-jhunjhunwala-29702",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/144100/144164.jpg"
		],
		"licha jhon": [
			"https://www.espncricinfo.com/cricketers/licha-jhon-1403175",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aranyadev jhala": [
			"https://www.espncricinfo.com/cricketers/aranyadev-jhala-1344393",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jaydeep singh": [
			"https://www.espncricinfo.com/cricketers/jaydeep-singh-1413367",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jay gohil": [
			"https://www.espncricinfo.com/cricketers/jay-gohil-1287036",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jaswant singh": [
			"https://www.espncricinfo.com/cricketers/jaswant-singh-1384956",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pankaj jaswal": [
			"https://www.espncricinfo.com/cricketers/pankaj-jaswal-652359",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314997.jpg"
		],
		"jassinder singh": [
			"https://www.espncricinfo.com/cricketers/jassinder-singh-1300585",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jasmer dhankhar": [
			"https://www.espncricinfo.com/cricketers/jasmer-dhankhar-1106121",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jaskirat singh sachdeva": [
			"https://www.espncricinfo.com/cricketers/jaskirat-singh-sachdeva-1409966",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jashwanth shreeram": [
			"https://www.espncricinfo.com/cricketers/jashwanth-shreeram-1324971",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ej jasper": [
			"https://www.espncricinfo.com/cricketers/ej-jasper-1392195",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chirag jani": [
			"https://www.espncricinfo.com/cricketers/chirag-jani-527362",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/175600/175619.jpg"
		],
		"mohit jangra": [
			"https://www.espncricinfo.com/cricketers/mohit-jangra-1151275",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"satish jangir": [
			"https://www.espncricinfo.com/cricketers/satish-jangir-1176126",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sohan jamale": [
			"https://www.espncricinfo.com/cricketers/sohan-jamale-1411642",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shadab jakati": [
			"https://www.espncricinfo.com/cricketers/shadab-jakati-29655",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/184300/184391.jpg"
		],
		"suraj sindhu jaiswal": [
			"https://www.espncricinfo.com/cricketers/suraj-sindhu-jaiswal-1277582",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yashasvi jaiswal": [
			"https://www.espncricinfo.com/cricketers/yashasvi-jaiswal-1151278",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356803.1.png"
		],
		"aprameya jaiswal": [
			"https://www.espncricinfo.com/cricketers/aprameya-jaiswal-1403184",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saahil jain": [
			"https://www.espncricinfo.com/cricketers/saahil-jain-956021",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saransh jain": [
			"https://www.espncricinfo.com/cricketers/saransh-jain-731381",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/201600/201689.1.jpg"
		],
		"prateek jain": [
			"https://www.espncricinfo.com/cricketers/prateek-jain-777553",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshay jain": [
			"https://www.espncricinfo.com/cricketers/akshay-jain-1409957",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jagjit singh": [
			"https://www.espncricinfo.com/cricketers/jagjit-singh-1210964",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314743.jpg"
		],
		"rs jaganath sinivas": [
			"https://www.espncricinfo.com/cricketers/rs-jaganath-sinivas-1048837",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362407.4.jpg"
		],
		"narayan jagadeesan": [
			"https://www.espncricinfo.com/cricketers/narayan-jagadeesan-1048813",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362328.4.jpg"
		],
		"jafar jamal": [
			"https://www.espncricinfo.com/cricketers/jafar-jamal-480167",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362276.4.jpg"
		],
		"yash jadhav": [
			"https://www.espncricinfo.com/cricketers/yash-jadhav-1324938",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kedar jadhav": [
			"https://www.espncricinfo.com/cricketers/kedar-jadhav-290716",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302500/302569.jpg"
		],
		"vishvaraj jadeja": [
			"https://www.espncricinfo.com/cricketers/vishvaraj-jadeja-1131753",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"viharsinh jadeja": [
			"https://www.espncricinfo.com/cricketers/viharsinh-jadeja-1395859",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravindra jadeja": [
			"https://www.espncricinfo.com/cricketers/ravindra-jadeja-234675",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302394.jpg"
		],
		"priyajitsing jadeja": [
			"https://www.espncricinfo.com/cricketers/priyajitsing-jadeja-1414943",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hitendra jadeja": [
			"https://www.espncricinfo.com/cricketers/hitendra-jadeja-1395855",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dharmendrasinh jadeja": [
			"https://www.espncricinfo.com/cricketers/dharmendrasinh-jadeja-598935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/175600/175623.jpg"
		],
		"sheldon jackson": [
			"https://www.espncricinfo.com/cricketers/sheldon-jackson-237696",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338172.4.jpg"
		],
		"venkatesh iyer": [
			"https://www.espncricinfo.com/cricketers/venkatesh-iyer-851403",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/328700/328712.1.jpg"
		],
		"shreyas iyer": [
			"https://www.espncricinfo.com/cricketers/shreyas-iyer-642519",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309198.1.jpg"
		],
		"sk ismail": [
			"https://www.espncricinfo.com/cricketers/sk-ismail-1175452",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314825.png"
		],
		"saika ishaque": [
			"https://www.espncricinfo.com/cricketers/saika-ishaque-597815",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ishan kishan": [
			"https://www.espncricinfo.com/cricketers/ishan-kishan-720471",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329345.4.jpg"
		],
		"iqbal abdulla": [
			"https://www.espncricinfo.com/cricketers/iqbal-abdulla-277237",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314936.jpg"
		],
		"manoj ingale": [
			"https://www.espncricinfo.com/cricketers/manoj-ingale-1175610",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"indiya toku": [
			"https://www.espncricinfo.com/cricketers/indiya-toku-1163660",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283600/283627.1.jpg"
		],
		"imran najir": [
			"https://www.espncricinfo.com/cricketers/imran-najir-1411197",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"riboklang hynniewta": [
			"https://www.espncricinfo.com/cricketers/riboklang-hynniewta-1252317",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanidhya hurkat": [
			"https://www.espncricinfo.com/cricketers/sanidhya-hurkat-1135345",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314911.jpg"
		],
		"harikrishna shishir": [
			"https://www.espncricinfo.com/cricketers/harikrishna-shishir-1324980",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chopise hopongkyu": [
			"https://www.espncricinfo.com/cricketers/chopise-hopongkyu-1213488",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kapil hooda": [
			"https://www.espncricinfo.com/cricketers/kapil-hooda-1159735",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283600/283685.icon.jpg"
		],
		"deepak hooda": [
			"https://www.espncricinfo.com/cricketers/deepak-hooda-497121",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/343200/343251.4.jpg"
		],
		"mihir hirwani": [
			"https://www.espncricinfo.com/cricketers/mihir-hirwani-826061",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manan hingrajia": [
			"https://www.espncricinfo.com/cricketers/manan-hingrajia-1201519",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295100/295152.1.jpg"
		],
		"himmat singh": [
			"https://www.espncricinfo.com/cricketers/himmat-singh-805235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/199700/199729.jpg"
		],
		"himanshu singh": [
			"https://www.espncricinfo.com/cricketers/himanshu-singh-1345711",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"henan nazir": [
			"https://www.espncricinfo.com/cricketers/henan-nazir-1211111",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"maramreddy reddy": [
			"https://www.espncricinfo.com/cricketers/maramreddy-reddy-1324459",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dayalan hemalatha": [
			"https://www.espncricinfo.com/cricketers/dayalan-hemalatha-961107",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304393.png"
		],
		"shubhang hegde": [
			"https://www.espncricinfo.com/cricketers/shubhang-hegde-1119008",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"adhoksh hegde": [
			"https://www.espncricinfo.com/cricketers/adhoksh-hegde-1155988",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul hazarika": [
			"https://www.espncricinfo.com/cricketers/rahul-hazarika-936337",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mayukh hazarika": [
			"https://www.espncricinfo.com/cricketers/mayukh-hazarika-1409967",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vikas hathwala": [
			"https://www.espncricinfo.com/cricketers/vikas-hathwala-854333",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281700/281772.jpg"
		],
		"hartejassvi kapoor": [
			"https://www.espncricinfo.com/cricketers/hartejassvi-kapoor-1349364",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harshit rana": [
			"https://www.espncricinfo.com/cricketers/harshit-rana-1312645",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357000/357017.1.png"
		],
		"harsh tyagi": [
			"https://www.espncricinfo.com/cricketers/harsh-tyagi-1081444",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harpreet singh": [
			"https://www.espncricinfo.com/cricketers/harpreet-singh-340854",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380686.4.png"
		],
		"harpreet brar": [
			"https://www.espncricinfo.com/cricketers/harpreet-brar-1168641",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381369.4.png"
		],
		"harnoor singh": [
			"https://www.espncricinfo.com/cricketers/harnoor-singh-1292496",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338253.4.jpg"
		],
		"ns harish": [
			"https://www.espncricinfo.com/cricketers/ns-harish-1194945",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362431.4.jpg"
		],
		"harish kumar": [
			"https://www.espncricinfo.com/cricketers/harish-kumar-1048765",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362324.4.jpg"
		],
		"karthikeyaprasad hariram": [
			"https://www.espncricinfo.com/cricketers/karthikeyaprasad-hariram-1324972",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajashekhar harikant": [
			"https://www.espncricinfo.com/cricketers/rajashekhar-harikant-796639",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/272400/272424.1.jpg"
		],
		"a hari prasad": [
			"https://www.espncricinfo.com/cricketers/a-hari-prasad-1384937",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hari nishaanth": [
			"https://www.espncricinfo.com/cricketers/hari-nishaanth-1048847",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377588.4.jpg"
		],
		"hardik raj": [
			"https://www.espncricinfo.com/cricketers/hardik-raj-1392182",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harbhajan singh": [
			"https://www.espncricinfo.com/cricketers/harbhajan-singh-29264",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302400/302494.jpg"
		],
		"rajvardhan hangargekar": [
			"https://www.espncricinfo.com/cricketers/rajvardhan-hangargekar-1175429",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336200/336292.4.jpg"
		],
		"nabam hachang": [
			"https://www.espncricinfo.com/cricketers/nabam-hachang-1339021",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"habib gandhi": [
			"https://www.espncricinfo.com/cricketers/habib-gandhi-1277540",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gurvinder singh": [
			"https://www.espncricinfo.com/cricketers/gurvinder-singh-430108",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ram gurung": [
			"https://www.espncricinfo.com/cricketers/ram-gurung-1287011",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gurkeerat singh mann": [
			"https://www.espncricinfo.com/cricketers/gurkeerat-singh-mann-537124",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309064.jpg"
		],
		"gurjapneet singh": [
			"https://www.espncricinfo.com/cricketers/gurjapneet-singh-1269869",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362596.4.jpg"
		],
		"gurinder singh": [
			"https://www.espncricinfo.com/cricketers/gurinder-singh-500164",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/280600/280623.1.jpg"
		],
		"rajneesh gurbani": [
			"https://www.espncricinfo.com/cricketers/rajneesh-gurbani-950165",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271400/271459.1.jpg"
		],
		"praveen gupta": [
			"https://www.espncricinfo.com/cricketers/praveen-gupta-28982",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/110800/110864.1.jpg"
		],
		"arjit gupta": [
			"https://www.espncricinfo.com/cricketers/arjit-gupta-427485",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315010.jpg"
		],
		"anshul gupta": [
			"https://www.espncricinfo.com/cricketers/anshul-gupta-536792",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349900/349947.3.jpg"
		],
		"gulfaam saleh": [
			"https://www.espncricinfo.com/cricketers/gulfaam-saleh-1324471",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arpit guleria": [
			"https://www.espncricinfo.com/cricketers/arpit-guleria-1167306",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315165.jpg"
		],
		"dhara gujjar": [
			"https://www.espncricinfo.com/cricketers/dhara-gujjar-1255408",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prashant gujjar": [
			"https://www.espncricinfo.com/cricketers/prashant-gujjar-1413902",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayant goyat": [
			"https://www.espncricinfo.com/cricketers/jayant-goyat-1408689",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya goyal": [
			"https://www.espncricinfo.com/cricketers/aditya-goyal-1197723",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"v gowtham": [
			"https://www.espncricinfo.com/cricketers/v-gowtham-1269872",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362595.4.jpg"
		],
		"krishnappa gowtham": [
			"https://www.espncricinfo.com/cricketers/krishnappa-gowtham-424377",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356850.1.png"
		],
		"gowtham thamarai kannan": [
			"https://www.espncricinfo.com/cricketers/gowtham-thamarai-kannan-1048777",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362565.5.jpg"
		],
		"j gowri sankar": [
			"https://www.espncricinfo.com/cricketers/j-gowri-sankar-1380125",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362405.4.jpg"
		],
		"dhanush gowda": [
			"https://www.espncricinfo.com/cricketers/dhanush-gowda-1292516",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dheeraj gowda": [
			"https://www.espncricinfo.com/cricketers/dheeraj-gowda-1327730",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shreevats goswami": [
			"https://www.espncricinfo.com/cricketers/shreevats-goswami-302579",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309088.png"
		],
		"siddhartha goswami": [
			"https://www.espncricinfo.com/cricketers/siddhartha-goswami-1413905",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ansh gosai": [
			"https://www.espncricinfo.com/cricketers/ansh-gosai-1292510",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mohit gorania": [
			"https://www.espncricinfo.com/cricketers/mohit-gorania-1395895",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhavana goplani": [
			"https://www.espncricinfo.com/cricketers/bhavana-goplani-1255453",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shreyas gopal": [
			"https://www.espncricinfo.com/cricketers/shreyas-gopal-344580",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309090.png"
		],
		"ramnivas golada": [
			"https://www.espncricinfo.com/cricketers/ramnivas-golada-1081134",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gohulmoorthi": [
			"https://www.espncricinfo.com/cricketers/gohulmoorthi-1320775",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dharmaditya gohil": [
			"https://www.espncricinfo.com/cricketers/dharmaditya-gohil-1395905",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prashant gohel": [
			"https://www.espncricinfo.com/cricketers/prashant-gohel-1395863",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arushi goel": [
			"https://www.espncricinfo.com/cricketers/arushi-goel-1255439",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"g godson": [
			"https://www.espncricinfo.com/cricketers/g-godson-1380129",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362275.4.jpg"
		],
		"sumit godara": [
			"https://www.espncricinfo.com/cricketers/sumit-godara-1415606",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gnaneswara rao": [
			"https://www.espncricinfo.com/cricketers/gnaneswara-rao-28830",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/360300/360399.1.png"
		],
		"cr gnaneshwar": [
			"https://www.espncricinfo.com/cricketers/cr-gnaneshwar-1168710",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314850.jpg"
		],
		"uppara girinath": [
			"https://www.espncricinfo.com/cricketers/uppara-girinath-1121577",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"girinath reddy": [
			"https://www.espncricinfo.com/cricketers/girinath-reddy-956033",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314828.jpg"
		],
		"subham ghosh": [
			"https://www.espncricinfo.com/cricketers/subham-ghosh-1163700",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramakrishna ghosh": [
			"https://www.espncricinfo.com/cricketers/ramakrishna-ghosh-1339053",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"richa ghosh": [
			"https://www.espncricinfo.com/cricketers/richa-ghosh-1212830",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304500/304552.png"
		],
		"bishal ghosh": [
			"https://www.espncricinfo.com/cricketers/bishal-ghosh-806309",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arindam ghosh": [
			"https://www.espncricinfo.com/cricketers/arindam-ghosh-220435",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"maurya ghoghari": [
			"https://www.espncricinfo.com/cricketers/maurya-ghoghari-1395870",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sudip kumar gharami": [
			"https://www.espncricinfo.com/cricketers/sudip-kumar-gharami-1211699",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sumit ghadigaonkar": [
			"https://www.espncricinfo.com/cricketers/sumit-ghadigaonkar-714455",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"george samuel": [
			"https://www.espncricinfo.com/cricketers/george-samuel-1273855",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajeshwari gayakwad": [
			"https://www.espncricinfo.com/cricketers/rajeshwari-gayakwad-709635",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304473.png"
		],
		"harsh gawli": [
			"https://www.espncricinfo.com/cricketers/harsh-gawli-1318543",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kashvee gautam": [
			"https://www.espncricinfo.com/cricketers/kashvee-gautam-1238006",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aneeshwar gautam": [
			"https://www.espncricinfo.com/cricketers/aneeshwar-gautam-1292513",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338200/338252.4.jpg"
		],
		"k gaurav": [
			"https://www.espncricinfo.com/cricketers/k-gaurav-1392243",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav yadav": [
			"https://www.espncricinfo.com/cricketers/gaurav-yadav-587486",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/151100/151105.jpg"
		],
		"gaurav singh": [
			"https://www.espncricinfo.com/cricketers/gaurav-singh-1159750",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav puri": [
			"https://www.espncricinfo.com/cricketers/gaurav-puri-1201545",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav joshi": [
			"https://www.espncricinfo.com/cricketers/gaurav-joshi-1345712",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav chaudhary": [
			"https://www.espncricinfo.com/cricketers/gaurav-chaudhary-1339708",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham garhwal": [
			"https://www.espncricinfo.com/cricketers/shubham-garhwal-1287019",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya garhwal": [
			"https://www.espncricinfo.com/cricketers/aditya-garhwal-725435",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315005.jpg"
		],
		"priyam garg": [
			"https://www.espncricinfo.com/cricketers/priyam-garg-1070180",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309082.png"
		],
		"lakshay garg": [
			"https://www.espncricinfo.com/cricketers/lakshay-garg-723207",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash gardharia": [
			"https://www.espncricinfo.com/cricketers/yash-gardharia-1395906",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deepraj gaonkar": [
			"https://www.espncricinfo.com/cricketers/deepraj-gaonkar-814241",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sakibul gani": [
			"https://www.espncricinfo.com/cricketers/sakibul-gani-1202786",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295600/295645.jpg"
		],
		"nikhil gangta": [
			"https://www.espncricinfo.com/cricketers/nikhil-gangta-528332",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ganga sridhar raju": [
			"https://www.espncricinfo.com/cricketers/ganga-sridhar-raju-477074",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362274.4.jpg"
		],
		"s ganesh": [
			"https://www.espncricinfo.com/cricketers/s-ganesh-1151310",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362526.4.jpg"
		],
		"ganesh satish": [
			"https://www.espncricinfo.com/cricketers/ganesh-satish-310953",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ganesh moorthi": [
			"https://www.espncricinfo.com/cricketers/ganesh-moorthi-1048727",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362404.4.jpg"
		],
		"kaushik gandhi": [
			"https://www.espncricinfo.com/cricketers/kaushik-gandhi-419670",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362409.4.jpg"
		],
		"chirag gandhi": [
			"https://www.espncricinfo.com/cricketers/chirag-gandhi-496219",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gautam gambhir": [
			"https://www.espncricinfo.com/cricketers/gautam-gambhir-28763",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304100/304196.png"
		],
		"vinay galetiya": [
			"https://www.espncricinfo.com/cricketers/vinay-galetiya-853991",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sammar gajjar": [
			"https://www.espncricinfo.com/cricketers/sammar-gajjar-1350773",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gajendra singh": [
			"https://www.espncricinfo.com/cricketers/gajendra-singh-1411661",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gajender tanwar": [
			"https://www.espncricinfo.com/cricketers/gajender-tanwar-1384928",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chintan gaja": [
			"https://www.espncricinfo.com/cricketers/chintan-gaja-735845",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/368900/368951.1.jpg"
		],
		"ruturaj gaikwad": [
			"https://www.espncricinfo.com/cricketers/ruturaj-gaikwad-1060380",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356779.1.png"
		],
		"gagandeep singh": [
			"https://www.espncricinfo.com/cricketers/gagandeep-singh-1287064",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gagan vats": [
			"https://www.espncricinfo.com/cricketers/gagan-vats-1409977",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"hasmukh gadhavi": [
			"https://www.espncricinfo.com/cricketers/hasmukh-gadhavi-1395901",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ishaan gadekar": [
			"https://www.espncricinfo.com/cricketers/ishaan-gadekar-1246467",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bharti fulmali": [
			"https://www.espncricinfo.com/cricketers/bharti-fulmali-961179",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304240.jpg"
		],
		"francis rokins": [
			"https://www.espncricinfo.com/cricketers/francis-rokins-1048779",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362273.4.jpg"
		],
		"daryl ferrario": [
			"https://www.espncricinfo.com/cricketers/daryl-ferrario-1070185",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362271.4.jpg"
		],
		"fazil rashid": [
			"https://www.espncricinfo.com/cricketers/fazil-rashid-1136215",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"faiz fazal": [
			"https://www.espncricinfo.com/cricketers/faiz-fazal-28671",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/187300/187319.5.jpg"
		],
		"fabid ahmed": [
			"https://www.espncricinfo.com/cricketers/fabid-ahmed-796627",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gedak ete": [
			"https://www.espncricinfo.com/cricketers/gedak-ete-1419276",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rithik easwaran": [
			"https://www.espncricinfo.com/cricketers/rithik-easwaran-1320767",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362449.4.jpg"
		],
		"k easwaran": [
			"https://www.espncricinfo.com/cricketers/k-easwaran-1320761",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362272.4.jpg"
		],
		"abhimanyu easwaran": [
			"https://www.espncricinfo.com/cricketers/abhimanyu-easwaran-699491",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/325200/325256.5.jpg"
		],
		"sylvester d’souza": [
			"https://www.espncricinfo.com/cricketers/sylvester-d-souza-1344403",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prerit dutta": [
			"https://www.espncricinfo.com/cricketers/prerit-dutta-1287034",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mrinmoy dutta": [
			"https://www.espncricinfo.com/cricketers/mrinmoy-dutta-956023",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"debasmita dutta": [
			"https://www.espncricinfo.com/cricketers/debasmita-dutta-1255524",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jarajapu durgakumar": [
			"https://www.espncricinfo.com/cricketers/jarajapu-durgakumar-1287005",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"miriyala durga": [
			"https://www.espncricinfo.com/cricketers/miriyala-durga-1255376",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"samar dubhashi": [
			"https://www.espncricinfo.com/cricketers/samar-dubhashi-826493",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash dubey": [
			"https://www.espncricinfo.com/cricketers/yash-dubey-1159728",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham dubey": [
			"https://www.espncricinfo.com/cricketers/shubham-dubey-1252585",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harsh dubey": [
			"https://www.espncricinfo.com/cricketers/harsh-dubey-1216159",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurabh dubey": [
			"https://www.espncricinfo.com/cricketers/saurabh-dubey-1206492",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"praveen dubey": [
			"https://www.espncricinfo.com/cricketers/praveen-dubey-777515",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/310700/310753.jpg"
		],
		"shivam dube": [
			"https://www.espncricinfo.com/cricketers/shivam-dube-714451",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356768.1.png"
		],
		"techi doria": [
			"https://www.espncricinfo.com/cricketers/techi-doria-1159759",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"paras dogra": [
			"https://www.espncricinfo.com/cricketers/paras-dogra-28160",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/168600/168679.1.jpg"
		],
		"yuvrajsinh dodiya": [
			"https://www.espncricinfo.com/cricketers/yuvrajsinh-dodiya-1349355",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gnanananda divya": [
			"https://www.espncricinfo.com/cricketers/gnanananda-divya-883397",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vp diran": [
			"https://www.espncricinfo.com/cricketers/vp-diran-1320757",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362360.4.jpg"
		],
		"ashok dinda": [
			"https://www.espncricinfo.com/cricketers/ashok-dinda-227712",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304270.png"
		],
		"digvijay patil": [
			"https://www.espncricinfo.com/cricketers/digvijay-patil-1408679",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"royston dias": [
			"https://www.espncricinfo.com/cricketers/royston-dias-624025",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bharath dhuri": [
			"https://www.espncricinfo.com/cricketers/bharath-dhuri-917153",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rajesh dhuper": [
			"https://www.espncricinfo.com/cricketers/rajesh-dhuper-922757",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yash dhull": [
			"https://www.espncricinfo.com/cricketers/yash-dhull-1292498",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336800/336898.4.jpg"
		],
		"dhruva kumar reddy": [
			"https://www.espncricinfo.com/cricketers/dhruva-kumar-reddy-1168636",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314852.png"
		],
		"ms dhoni": [
			"https://www.espncricinfo.com/cricketers/ms-dhoni-28081",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302400/302402.jpg"
		],
		"sahil dhiwan": [
			"https://www.espncricinfo.com/cricketers/sahil-dhiwan-1081220",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gaurav dhiman": [
			"https://www.espncricinfo.com/cricketers/gaurav-dhiman-28619",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/67200/67288.1.jpg"
		],
		"dheeraj kumar": [
			"https://www.espncricinfo.com/cricketers/dheeraj-kumar-1246430",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314826.jpg"
		],
		"shikhar dhawan": [
			"https://www.espncricinfo.com/cricketers/shikhar-dhawan-28235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302373.jpg"
		],
		"rishi dhawan": [
			"https://www.espncricinfo.com/cricketers/rishi-dhawan-290727",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380691.4.png"
		],
		"sachin dhas": [
			"https://www.espncricinfo.com/cricketers/sachin-dhas-1408683",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dharani kumar": [
			"https://www.espncricinfo.com/cricketers/dharani-kumar-1324498",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deepak dhapola": [
			"https://www.espncricinfo.com/cricketers/deepak-dhapola-1159779",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282400/282453.1.jpg"
		],
		"vineet dhankhar": [
			"https://www.espncricinfo.com/cricketers/vineet-dhankhar-1403173",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohit dhanda": [
			"https://www.espncricinfo.com/cricketers/rohit-dhanda-1339050",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bijon dey": [
			"https://www.espncricinfo.com/cricketers/bijon-dey-1163677",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313800/313898.jpg"
		],
		"rajat dey": [
			"https://www.espncricinfo.com/cricketers/rajat-dey-955091",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"babul dey": [
			"https://www.espncricinfo.com/cricketers/babul-dey-1414691",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"prem devkar": [
			"https://www.espncricinfo.com/cricketers/prem-devkar-1408691",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ningthoujam devi": [
			"https://www.espncricinfo.com/cricketers/ningthoujam-devi-1289973",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deepak devadiga": [
			"https://www.espncricinfo.com/cricketers/deepak-devadiga-1392191",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dev lakra": [
			"https://www.espncricinfo.com/cricketers/dev-lakra-1299881",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tushar deshpande": [
			"https://www.espncricinfo.com/cricketers/tushar-deshpande-822553",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/310600/310643.jpg"
		],
		"pavan deshpande": [
			"https://www.espncricinfo.com/cricketers/pavan-deshpande-422104",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308600/308626.1.jpg"
		],
		"harsh desai": [
			"https://www.espncricinfo.com/cricketers/harsh-desai-1339049",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjeet desai": [
			"https://www.espncricinfo.com/cricketers/sanjeet-desai-1135347",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"siddharth desai": [
			"https://www.espncricinfo.com/cricketers/siddharth-desai-1123681",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harvik desai": [
			"https://www.espncricinfo.com/cricketers/harvik-desai-1070195",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381381.4.png"
		],
		"amogh sunil desai": [
			"https://www.espncricinfo.com/cricketers/amogh-sunil-desai-554398",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"harleen deol": [
			"https://www.espncricinfo.com/cricketers/harleen-deol-960845",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329348.5.jpg"
		],
		"kumar deobrat": [
			"https://www.espncricinfo.com/cricketers/kumar-deobrat-500154",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"denish das": [
			"https://www.espncricinfo.com/cricketers/denish-das-1246422",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deependra singh": [
			"https://www.espncricinfo.com/cricketers/deependra-singh-1408674",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"madha deepak": [
			"https://www.espncricinfo.com/cricketers/madha-deepak-1324509",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deepak yadav": [
			"https://www.espncricinfo.com/cricketers/deepak-yadav-1409953",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"deepak choudhary": [
			"https://www.espncricinfo.com/cricketers/deepak-choudhary-1384951",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"k deeban lingesh": [
			"https://www.espncricinfo.com/cricketers/k-deeban-lingesh-1108331",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362594.4.jpg"
		],
		"bikramjit debnath": [
			"https://www.espncricinfo.com/cricketers/bikramjit-debnath-1159721",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arjun debnath": [
			"https://www.espncricinfo.com/cricketers/arjun-debnath-1079713",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"joydeb deb": [
			"https://www.espncricinfo.com/cricketers/joydeb-deb-1409955",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mk datta reddy": [
			"https://www.espncricinfo.com/cricketers/mk-datta-reddy-1324457",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pallab das": [
			"https://www.espncricinfo.com/cricketers/pallab-das-1213492",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pallavkumar das": [
			"https://www.espncricinfo.com/cricketers/pallavkumar-das-499323",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"monika das": [
			"https://www.espncricinfo.com/cricketers/monika-das-960697",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bikramkumar das": [
			"https://www.espncricinfo.com/cricketers/bikramkumar-das-955093",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"annapurna das": [
			"https://www.espncricinfo.com/cricketers/annapurna-das-961127",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sitesh das": [
			"https://www.espncricinfo.com/cricketers/sitesh-das-1403180",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishav das": [
			"https://www.espncricinfo.com/cricketers/rishav-das-440828",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/256200/256224.1.jpg"
		],
		"mb darshan": [
			"https://www.espncricinfo.com/cricketers/mb-darshan-917167",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"dev dand": [
			"https://www.espncricinfo.com/cricketers/dev-dand-1395891",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"daksh": [
			"https://www.espncricinfo.com/cricketers/daksh-1413385",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"mayank dagar": [
			"https://www.espncricinfo.com/cricketers/mayank-dagar-942367",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356822.1.png"
		],
		"pradeep dadhe": [
			"https://www.espncricinfo.com/cricketers/pradeep-dadhe-1065926",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nathan d\"mello": [
			"https: //www.espncricinfo.com/cricketers/nathan-d-mello-1392935",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yuvraj chudasama": [
			"https://www.espncricinfo.com/cricketers/yuvraj-chudasama-969367",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhagyaraj chudasama": [
			"https://www.espncricinfo.com/cricketers/bhagyaraj-chudasama-1395853",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rohan chowdury": [
			"https://www.espncricinfo.com/cricketers/rohan-chowdury-1403159",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishabh chouhan": [
			"https://www.espncricinfo.com/cricketers/rishabh-chouhan-1175433",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ram chouhan": [
			"https://www.espncricinfo.com/cricketers/ram-chouhan-1410027",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ashish chouhan": [
			"https://www.espncricinfo.com/cricketers/ashish-chouhan-1403199",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"avinov choudhury": [
			"https://www.espncricinfo.com/cricketers/avinov-choudhury-1339014",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"varun choudhary": [
			"https://www.espncricinfo.com/cricketers/varun-choudhary-1159723",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/339300/339314.1.png"
		],
		"raj choudhary": [
			"https://www.espncricinfo.com/cricketers/raj-choudhary-1246456",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314748.jpg"
		],
		"akash choudhary": [
			"https://www.espncricinfo.com/cricketers/akash-choudhary-1175450",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334000/334096.gif"
		],
		"mukul choudhary": [
			"https://www.espncricinfo.com/cricketers/mukul-choudhary-1354217",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aniket choudhary": [
			"https://www.espncricinfo.com/cricketers/aniket-choudhary-527299",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315008.jpg"
		],
		"manav chothani": [
			"https://www.espncricinfo.com/cricketers/manav-chothani-1395856",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kiran chormale": [
			"https://www.espncricinfo.com/cricketers/kiran-chormale-1408686",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parshavi chopra": [
			"https://www.espncricinfo.com/cricketers/parshavi-chopra-1346678",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353200/353252.4.jpg"
		],
		"prashant chopra": [
			"https://www.espncricinfo.com/cricketers/prashant-chopra-500135",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315163.jpg"
		],
		"agni chopra": [
			"https://www.espncricinfo.com/cricketers/agni-chopra-1403162",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chongtham mehul": [
			"https://www.espncricinfo.com/cricketers/chongtham-mehul-1252385",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"gonnabattula chiranjeevi": [
			"https://www.espncricinfo.com/cricketers/gonnabattula-chiranjeevi-477014",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/298900/298962.1.jpg"
		],
		"bharat chipli": [
			"https://www.espncricinfo.com/cricketers/bharat-chipli-27685",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/131700/131740.3.jpg"
		],
		"bidash chingakham": [
			"https://www.espncricinfo.com/cricketers/bidash-chingakham-1246509",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314957.jpg"
		],
		"swastik chikara": [
			"https://www.espncricinfo.com/cricketers/swastik-chikara-1403198",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380668.1.png"
		],
		"jyot chhaya": [
			"https://www.espncricinfo.com/cricketers/jyot-chhaya-469059",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"chandra chettri": [
			"https://www.espncricinfo.com/cricketers/chandra-chettri-1252381",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317000/317045.1.jpg"
		],
		"arun chettri": [
			"https://www.espncricinfo.com/cricketers/arun-chettri-1349372",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sabin chettri": [
			"https://www.espncricinfo.com/cricketers/sabin-chettri-1205287",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296300/296371.1.jpg"
		],
		"pranesh chettri": [
			"https://www.espncricinfo.com/cricketers/pranesh-chettri-1403541",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"uma chetry": [
			"https://www.espncricinfo.com/cricketers/uma-chetry-960695",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lr chethan": [
			"https://www.espncricinfo.com/cricketers/lr-chethan-1197718",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345400/345432.png"
		],
		"piyush chawla": [
			"https://www.espncricinfo.com/cricketers/piyush-chawla-32966",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304219.png"
		],
		"neha chavda": [
			"https://www.espncricinfo.com/cricketers/neha-chavda-961081",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nayan chavan": [
			"https://www.espncricinfo.com/cricketers/nayan-chavan-1403207",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sagar chaurasia": [
			"https://www.espncricinfo.com/cricketers/sagar-chaurasia-1414702",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"parth chauhan": [
			"https://www.espncricinfo.com/cricketers/parth-chauhan-1206033",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"desh chauhan": [
			"https://www.espncricinfo.com/cricketers/desh-chauhan-1384949",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"saurav chauhan": [
			"https://www.espncricinfo.com/cricketers/saurav-chauhan-1287369",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380688.1.png"
		],
		"pruthvi chauhan": [
			"https://www.espncricinfo.com/cricketers/pruthvi-chauhan-1395860",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jay chauhan": [
			"https://www.espncricinfo.com/cricketers/jay-chauhan-1069599",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"himanshu chauhan": [
			"https://www.espncricinfo.com/cricketers/himanshu-chauhan-1415164",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"divyaraj chauhan": [
			"https://www.espncricinfo.com/cricketers/divyaraj-chauhan-554710",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yuvraj chaudhary": [
			"https://www.espncricinfo.com/cricketers/yuvraj-chaudhary-1175463",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shivam chaudhary": [
			"https://www.espncricinfo.com/cricketers/shivam-chaudhary-826869",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sakshaim chaudhary": [
			"https://www.espncricinfo.com/cricketers/sakshaim-chaudhary-1403164",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ishwar chaudhary": [
			"https://www.espncricinfo.com/cricketers/ishwar-chaudhary-290722",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/254600/254607.1.jpg"
		],
		"riya chaudhari": [
			"https://www.espncricinfo.com/cricketers/riya-chaudhari-1255534",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ayan chaudhari": [
			"https://www.espncricinfo.com/cricketers/ayan-chaudhari-1419241",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shubham chaubey": [
			"https://www.espncricinfo.com/cricketers/shubham-chaubey-950217",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanjeev chaturvedi": [
			"https://www.espncricinfo.com/cricketers/sanjeev-chaturvedi-1413386",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ns chaturved": [
			"https://www.espncricinfo.com/cricketers/ns-chaturved-1048833",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362525.4.jpg"
		],
		"subham chatterjee": [
			"https://www.espncricinfo.com/cricketers/subham-chatterjee-1277537",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sudip chatterjee": [
			"https://www.espncricinfo.com/cricketers/sudip-chatterjee-447142",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anish charak": [
			"https://www.espncricinfo.com/cricketers/anish-charak-1246426",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314755.jpg"
		],
		"dharam changela": [
			"https://www.espncricinfo.com/cricketers/dharam-changela-1395902",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshay chandran": [
			"https://www.espncricinfo.com/cricketers/akshay-chandran-824891",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shashank chandrakar": [
			"https://www.espncricinfo.com/cricketers/shashank-chandrakar-1131881",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314913.jpg"
		],
		"kunal chandela": [
			"https://www.espncricinfo.com/cricketers/kunal-chandela-1121574",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353920.1.png"
		],
		"supriyo chakraborty": [
			"https://www.espncricinfo.com/cricketers/supriyo-chakraborty-1176958",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/287000/287076.1.jpg"
		],
		"abir chakraborty": [
			"https://www.espncricinfo.com/cricketers/abir-chakraborty-1409968",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul chahar": [
			"https://www.espncricinfo.com/cricketers/rahul-chahar-1064812",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329346.4.jpg"
		],
		"deepak chahar": [
			"https://www.espncricinfo.com/cricketers/deepak-chahar-447261",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315014.jpg"
		],
		"yuzvendra chahal": [
			"https://www.espncricinfo.com/cricketers/yuzvendra-chahal-430246",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312155.png"
		],
		"ajit chahal": [
			"https://www.espncricinfo.com/cricketers/ajit-chahal-950027",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kc cariappa": [
			"https://www.espncricinfo.com/cricketers/kc-cariappa-777537",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356801.1.png"
		],
		"jivesh butte": [
			"https://www.espncricinfo.com/cricketers/jivesh-butte-1403200",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jasprit bumrah": [
			"https://www.espncricinfo.com/cricketers/jasprit-bumrah-625383",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356849.1.png"
		],
		"rahul buddhi": [
			"https://www.espncricinfo.com/cricketers/rahul-buddhi-1212693",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314798.jpg"
		],
		"aryan bora": [
			"https://www.espncricinfo.com/cricketers/aryan-bora-1216218",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"devendra singh bora": [
			"https://www.espncricinfo.com/cricketers/devendra-singh-bora-1398411",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rishi bopanna": [
			"https://www.espncricinfo.com/cricketers/rishi-bopanna-1197722",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s boopalan": [
			"https://www.espncricinfo.com/cricketers/s-boopalan-1151284",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/367400/367494.4.jpg"
		],
		"kartik biswal": [
			"https://www.espncricinfo.com/cricketers/kartik-biswal-1252328",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"raj biswa": [
			"https://www.espncricinfo.com/cricketers/raj-biswa-852295",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jay bista": [
			"https://www.espncricinfo.com/cricketers/jay-bista-857833",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315185.jpg"
		],
		"robin bist": [
			"https://www.espncricinfo.com/cricketers/robin-bist-262464",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315100/315115.1.jpg"
		],
		"manvinder bisla": [
			"https://www.espncricinfo.com/cricketers/manvinder-bisla-27280",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/146000/146009.jpg"
		],
		"himanshu bisht": [
			"https://www.espncricinfo.com/cricketers/himanshu-bisht-1175434",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314934.jpg"
		],
		"ekta bisht": [
			"https://www.espncricinfo.com/cricketers/ekta-bisht-442048",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304400/304463.png"
		],
		"bipul sharma": [
			"https://www.espncricinfo.com/cricketers/bipul-sharma-35928",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282200/282220.1.jpg"
		],
		"stuart binny": [
			"https://www.espncricinfo.com/cricketers/stuart-binny-27223",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304260.png"
		],
		"jyoti bind": [
			"https://www.espncricinfo.com/cricketers/jyoti-bind-1403540",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bikash singh": [
			"https://www.espncricinfo.com/cricketers/bikash-singh-1340427",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"baljeet singh bihari": [
			"https://www.espncricinfo.com/cricketers/baljeet-singh-bihari-1339036",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bihari rai": [
			"https://www.espncricinfo.com/cricketers/bihari-rai-1212758",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"j biakthanpuia": [
			"https://www.espncricinfo.com/cricketers/j-biakthanpuia-1403161",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"p bhuvaneswaran": [
			"https://www.espncricinfo.com/cricketers/p-bhuvaneswaran-1380111",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362524.4.jpg"
		],
		"nachiket bhute": [
			"https://www.espncricinfo.com/cricketers/nachiket-bhute-1210279",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314746.jpg"
		],
		"parth bhut": [
			"https://www.espncricinfo.com/cricketers/parth-bhut-1211064",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhupender chauhan": [
			"https://www.espncricinfo.com/cricketers/bhupender-chauhan-1273908",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhupandera sharma": [
			"https://www.espncricinfo.com/cricketers/bhupandera-sharma-1385977",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"varun bhuie": [
			"https://www.espncricinfo.com/cricketers/varun-bhuie-1408684",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ricky bhui": [
			"https://www.espncricinfo.com/cricketers/ricky-bhui-642531",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314834.jpg"
		],
		"sachin bhosale": [
			"https://www.espncricinfo.com/cricketers/sachin-bhosale-1292553",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"om bhosale": [
			"https://www.espncricinfo.com/cricketers/om-bhosale-1125135",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhim sharma": [
			"https://www.espncricinfo.com/cricketers/bhim-sharma-1346234",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bhavesh seth": [
			"https://www.espncricinfo.com/cricketers/bhavesh-seth-1292544",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aakash bhattacharhjee": [
			"https://www.espncricinfo.com/cricketers/aakash-bhattacharhjee-1415170",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav bhatt": [
			"https://www.espncricinfo.com/cricketers/vaibhav-bhatt-1159772",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282100/282180.1.jpg"
		],
		"bhargav bhatt": [
			"https://www.espncricinfo.com/cricketers/bhargav-bhatt-433410",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/132800/132831.jpg"
		],
		"amogh bhatkal": [
			"https://www.espncricinfo.com/cricketers/amogh-bhatkal-1416219",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"yastika bhatia": [
			"https://www.espncricinfo.com/cricketers/yastika-bhatia-960715",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329353.4.jpg"
		],
		"taniya bhatia": [
			"https://www.espncricinfo.com/cricketers/taniya-bhatia-883423",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304398.png"
		],
		"rajat bhatia": [
			"https://www.espncricinfo.com/cricketers/rajat-bhatia-26907",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/109200/109204.jpg"
		],
		"suboth bhati": [
			"https://www.espncricinfo.com/cricketers/suboth-bhati-934935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362382.4.jpg"
		],
		"prashant bhati": [
			"https://www.espncricinfo.com/cricketers/prashant-bhati-1403166",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anant bharwad": [
			"https://www.espncricinfo.com/cricketers/anant-bharwad-1404554",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vedant bhardwaj": [
			"https://www.espncricinfo.com/cricketers/vedant-bhardwaj-1319140",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/340700/340720.png"
		],
		"dhanasekaran bharathkumar": [
			"https://www.espncricinfo.com/cricketers/dhanasekaran-bharathkumar-1324943",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"srikar bharat": [
			"https://www.espncricinfo.com/cricketers/srikar-bharat-529436",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314851.png"
		],
		"mandar bhandari": [
			"https://www.espncricinfo.com/cricketers/mandar-bhandari-1159729",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"manoj bhandage": [
			"https://www.espncricinfo.com/cricketers/manoj-bhandage-1057399",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357622.4.jpg"
		],
		"shivam bhambri": [
			"https://www.espncricinfo.com/cricketers/shivam-bhambri-1201546",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"sanyog bhagwat": [
			"https://www.espncricinfo.com/cricketers/sanyog-bhagwat-1408676",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jayanta behera": [
			"https://www.espncricinfo.com/cricketers/jayanta-behera-528232",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vansh bedi": [
			"https://www.espncricinfo.com/cricketers/vansh-bedi-1413379",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kishan bedare": [
			"https://www.espncricinfo.com/cricketers/kishan-bedare-1154824",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit bawne": [
			"https://www.espncricinfo.com/cricketers/ankit-bawne-327123",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/177500/177549.1.jpg"
		],
		"raj bawa": [
			"https://www.espncricinfo.com/cricketers/raj-bawa-1292502",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/337400/337424.4.jpg"
		],
		"sonu batham": [
			"https://www.espncricinfo.com/cricketers/sonu-batham-1395883",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"rahul batham": [
			"https://www.espncricinfo.com/cricketers/rahul-batham-942649",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"basukinath": [
			"https://www.espncricinfo.com/cricketers/basukinath-851743",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299900/299900.1.jpg"
		],
		"rishab baslas": [
			"https://www.espncricinfo.com/cricketers/rishab-baslas-1414701",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"basir rahman": [
			"https://www.espncricinfo.com/cricketers/basir-rahman-1206054",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"nedumankuzhy basil": [
			"https://www.espncricinfo.com/cricketers/nedumankuzhy-basil-1214015",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"basil thampi": [
			"https://www.espncricinfo.com/cricketers/basil-thampi-732291",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309057.jpg"
		],
		"shaik basha": [
			"https://www.espncricinfo.com/cricketers/shaik-basha-1324510",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"baltej singh": [
			"https://www.espncricinfo.com/cricketers/baltej-singh-527292",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356797.1.png"
		],
		"siddharth balodi": [
			"https://www.espncricinfo.com/cricketers/siddharth-balodi-1351987",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"satyam baliyan": [
			"https://www.espncricinfo.com/cricketers/satyam-baliyan-1339028",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"priyanka bala": [
			"https://www.espncricinfo.com/cricketers/priyanka-bala-1255564",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bal krishna": [
			"https://www.espncricinfo.com/cricketers/bal-krishna-1246457",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kashyap bakhale": [
			"https://www.espncricinfo.com/cricketers/kashyap-bakhale-955101",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankush bains": [
			"https://www.espncricinfo.com/cricketers/ankush-bains-604534",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179400/179471.1.jpg"
		],
		"simran bahadur": [
			"https://www.espncricinfo.com/cricketers/simran-bahadur-1204925",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335100/335142.4.jpg"
		],
		"sunpreetsingh bagga": [
			"https://www.espncricinfo.com/cricketers/sunpreetsingh-bagga-1414944",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"maan bafna": [
			"https://www.espncricinfo.com/cricketers/maan-bafna-1048781",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362412.4.jpg"
		],
		"avanish badrinath": [
			"https://www.espncricinfo.com/cricketers/avanish-badrinath-1324976",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s badrinath": [
			"https://www.espncricinfo.com/cricketers/s-badrinath-26806",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302389.jpg"
		],
		"ayush badoni": [
			"https://www.espncricinfo.com/cricketers/ayush-badoni-1151270",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"satyajeet bachhav": [
			"https://www.espncricinfo.com/cricketers/satyajeet-bachhav-591653",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"babul kumar": [
			"https://www.espncricinfo.com/cricketers/babul-kumar-598933",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286100/286137.1.jpg"
		],
		"baba indrajith": [
			"https://www.espncricinfo.com/cricketers/baba-indrajith-477069",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362370.4.jpg"
		],
		"bandaru ayyappa": [
			"https://www.espncricinfo.com/cricketers/bandaru-ayyappa-588144",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/259900/259911.1.jpg"
		],
		"ayyanar rajendiran": [
			"https://www.espncricinfo.com/cricketers/ayyanar-rajendiran-1273865",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ayudh sharma": [
			"https://www.espncricinfo.com/cricketers/ayudh-sharma-1386493",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ayush awasthi": [
			"https://www.espncricinfo.com/cricketers/ayush-awasthi-1403178",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"avneesh sudha": [
			"https://www.espncricinfo.com/cricketers/avneesh-sudha-1171647",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/340700/340728.png"
		],
		"pyla avinash": [
			"https://www.espncricinfo.com/cricketers/pyla-avinash-1324449",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"d avinash": [
			"https://www.espncricinfo.com/cricketers/d-avinash-1119009",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"avinash jadhav": [
			"https://www.espncricinfo.com/cricketers/avinash-jadhav-1273885",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"avesh khan": [
			"https://www.espncricinfo.com/cricketers/avesh-khan-694211",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/200000/200065.1.jpg"
		],
		"mohit avasthi": [
			"https://www.espncricinfo.com/cricketers/mohit-avasthi-1252336",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aushik srinivas": [
			"https://www.espncricinfo.com/cricketers/aushik-srinivas-423815",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/174100/174177.jpg"
		],
		"auqib nabi": [
			"https://www.espncricinfo.com/cricketers/auqib-nabi-1159732",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/284200/284241.1.jpg"
		],
		"athisayaraj davidson": [
			"https://www.espncricinfo.com/cricketers/athisayaraj-davidson-1048737",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362240.4.jpg"
		],
		"atheeq ur rahman": [
			"https://www.espncricinfo.com/cricketers/atheeq-ur-rahman-1269850",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/374000/374082.4.jpg"
		],
		"km asif": [
			"https://www.espncricinfo.com/cricketers/km-asif-1083030",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356800.1.png"
		],
		"sanjay ashwin": [
			"https://www.espncricinfo.com/cricketers/sanjay-ashwin-1394507",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ravichandran ashwin": [
			"https://www.espncricinfo.com/cricketers/ravichandran-ashwin-26421",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302395.jpg"
		],
		"murugan ashwin": [
			"https://www.espncricinfo.com/cricketers/murugan-ashwin-528067",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377589.4.jpg"
		],
		"ashwin hebbar": [
			"https://www.espncricinfo.com/cricketers/ashwin-hebbar-801019",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314823.jpg"
		],
		"ashutosh singh": [
			"https://www.espncricinfo.com/cricketers/ashutosh-singh-945511",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/294900/294944.jpg"
		],
		"ashutosh aman": [
			"https://www.espncricinfo.com/cricketers/ashutosh-aman-799327",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309176.1.jpg"
		],
		"s ashish": [
			"https://www.espncricinfo.com/cricketers/s-ashish-1135332",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314820.jpg"
		],
		"ashish kumar": [
			"https://www.espncricinfo.com/cricketers/ashish-kumar-536582",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aryan sahani": [
			"https://www.espncricinfo.com/cricketers/aryan-sahani-1403181",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"paras arya": [
			"https://www.espncricinfo.com/cricketers/paras-arya-1327696",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"priyansh arya": [
			"https://www.espncricinfo.com/cricketers/priyansh-arya-1175456",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"v arunachalam": [
			"https://www.espncricinfo.com/cricketers/v-arunachalam-1384953",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s arun": [
			"https://www.espncricinfo.com/cricketers/s-arun-1048843",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362357.4.jpg"
		],
		"sj arun kumar": [
			"https://www.espncricinfo.com/cricketers/sj-arun-kumar-1380122",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362429.4.jpg"
		],
		"arun karthik": [
			"https://www.espncricinfo.com/cricketers/arun-karthik-319745",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362423.4.jpg"
		],
		"arslan khan": [
			"https://www.espncricinfo.com/cricketers/arslan-khan-1209159",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arshdeep singh": [
			"https://www.espncricinfo.com/cricketers/arshdeep-singh-1125976",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356795.1.png"
		],
		"arshad khan": [
			"https://www.espncricinfo.com/cricketers/arshad-khan-1244751",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378100/378129.1.png"
		],
		"arpit pannu": [
			"https://www.espncricinfo.com/cricketers/arpit-pannu-1060246",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"vaibhav arora": [
			"https://www.espncricinfo.com/cricketers/vaibhav-arora-1209292",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380684.4.jpg"
		],
		"ritik arora": [
			"https://www.espncricinfo.com/cricketers/ritik-arora-1413382",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arjun azad": [
			"https://www.espncricinfo.com/cricketers/arjun-azad-1175464",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arjit pannu": [
			"https://www.espncricinfo.com/cricketers/arjit-pannu-1287049",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"arbin singh": [
			"https://www.espncricinfo.com/cricketers/arbin-singh-1349358",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"a aravinddaraj": [
			"https://www.espncricinfo.com/cricketers/a-aravinddaraj-1175501",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kothandapani aravind": [
			"https://www.espncricinfo.com/cricketers/kothandapani-aravind-1273876",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s aravind": [
			"https://www.espncricinfo.com/cricketers/s-aravind-1113190",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362403.4.jpg"
		],
		"aravind akash": [
			"https://www.espncricinfo.com/cricketers/aravind-akash-1273896",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aravelly avanish": [
			"https://www.espncricinfo.com/cricketers/aravelly-avanish-1408675",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/379000/379037.4.jpg"
		],
		"arafat khan": [
			"https://www.espncricinfo.com/cricketers/arafat-khan-1081132",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"lochan appanna": [
			"https://www.espncricinfo.com/cricketers/lochan-appanna-1197701",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kp appanna": [
			"https://www.espncricinfo.com/cricketers/kp-appanna-269170",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/82400/82427.1.jpg"
		],
		"baba aparajith": [
			"https://www.espncricinfo.com/cricketers/baba-aparajith-477071",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362323.4.jpg"
		],
		"sundaresan anusha": [
			"https://www.espncricinfo.com/cricketers/sundaresan-anusha-961103",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"bareddy anusha": [
			"https://www.espncricinfo.com/cricketers/bareddy-anusha-1255374",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anureet singh": [
			"https://www.espncricinfo.com/cricketers/anureet-singh-376324",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314600/314680.1.jpg"
		],
		"anurag chaudhary": [
			"https://www.espncricinfo.com/cricketers/anurag-chaudhary-1413904",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anujit parmar": [
			"https://www.espncricinfo.com/cricketers/anujit-parmar-1300789",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anuj rawat": [
			"https://www.espncricinfo.com/cricketers/anuj-rawat-1123073",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357600/357621.7.jpg"
		],
		"antony dhas": [
			"https://www.espncricinfo.com/cricketers/antony-dhas-851817",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362200/362239.4.jpg"
		],
		"anmolpreet singh": [
			"https://www.espncricinfo.com/cricketers/anmolpreet-singh-851261",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356823.1.png"
		],
		"ankur malik": [
			"https://www.espncricinfo.com/cricketers/ankur-malik-1287083",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354200/354260.1.png"
		],
		"atharva ankolekar": [
			"https://www.espncricinfo.com/cricketers/atharva-ankolekar-1175467",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit mishra": [
			"https://www.espncricinfo.com/cricketers/ankit-mishra-1277567",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ankit kumar": [
			"https://www.espncricinfo.com/cricketers/ankit-kumar-1168733",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/283600/283683.1.jpg"
		],
		"midde anjaneyulu": [
			"https://www.espncricinfo.com/cricketers/midde-anjaneyulu-1324487",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anjali sarvani": [
			"https://www.espncricinfo.com/cricketers/anjali-sarvani-960673",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353965.4.jpg"
		],
		"balchander anirudh": [
			"https://www.espncricinfo.com/cricketers/balchander-anirudh-721971",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/253400/253450.jpg"
		],
		"anikethreddy": [
			"https://www.espncricinfo.com/cricketers/anikethreddy-1216134",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kv aneesh": [
			"https://www.espncricinfo.com/cricketers/kv-aneesh-1327693",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"andrew subikshan": [
			"https://www.espncricinfo.com/cricketers/andrew-subikshan-1048789",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"jehu anderson": [
			"https://www.espncricinfo.com/cricketers/jehu-anderson-1339016",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"doddamani anand": [
			"https://www.espncricinfo.com/cricketers/doddamani-anand-917247",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amitoze singh": [
			"https://www.espncricinfo.com/cricketers/amitoze-singh-482315",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/156900/156923.jpg"
		],
		"amit verma": [
			"https://www.espncricinfo.com/cricketers/amit-verma-26441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/266700/266741.1.jpg"
		],
		"amit sathvik": [
			"https://www.espncricinfo.com/cricketers/amit-sathvik-1269887",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362402.4.jpg"
		],
		"amit kumar": [
			"https://www.espncricinfo.com/cricketers/amit-kumar-542935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350500/350504.4.jpg"
		],
		"amit ali": [
			"https://www.espncricinfo.com/cricketers/amit-ali-1252346",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ameer zeeshan": [
			"https://www.espncricinfo.com/cricketers/ameer-zeeshan-1273853",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"amarjeet singh": [
			"https://www.espncricinfo.com/cricketers/amarjeet-singh-1414695",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aman khan": [
			"https://www.espncricinfo.com/cricketers/aman-khan-1119011",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"altmash alam": [
			"https://www.espncricinfo.com/cricketers/altmash-alam-1413363",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"alipt gupta": [
			"https://www.espncricinfo.com/cricketers/alipt-gupta-1413380",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ramadoss alexandar": [
			"https://www.espncricinfo.com/cricketers/ramadoss-alexandar-1048743",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/367400/367492.4.jpg"
		],
		"felix alemao": [
			"https://www.espncricinfo.com/cricketers/felix-alemao-955103",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"al bashid muhammed": [
			"https://www.espncricinfo.com/cricketers/al-bashid-muhammed-1201540",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshit rana": [
			"https://www.espncricinfo.com/cricketers/akshit-rana-1339051",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshat raghuwanshi": [
			"https://www.espncricinfo.com/cricketers/akshat-raghuwanshi-1300795",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akshan rao": [
			"https://www.espncricinfo.com/cricketers/akshan-rao-1327703",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akhin sathar": [
			"https://www.espncricinfo.com/cricketers/akhin-sathar-1409446",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shambu akhil": [
			"https://www.espncricinfo.com/cricketers/shambu-akhil-1324452",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"salunke akhil": [
			"https://www.espncricinfo.com/cricketers/salunke-akhil-1392215",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akhil chaudhary": [
			"https://www.espncricinfo.com/cricketers/akhil-chaudhary-1420401",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"pougajendy akash": [
			"https://www.espncricinfo.com/cricketers/pougajendy-akash-1324969",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akash sumra": [
			"https://www.espncricinfo.com/cricketers/akash-sumra-1048723",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362401.4.jpg"
		],
		"akash sudan": [
			"https://www.espncricinfo.com/cricketers/akash-sudan-959675",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"akash singh": [
			"https://www.espncricinfo.com/cricketers/akash-singh-1175458",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315007.jpg"
		],
		"akash deep": [
			"https://www.espncricinfo.com/cricketers/akash-deep-1176959",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356814.1.png"
		],
		"ajith ram": [
			"https://www.espncricinfo.com/cricketers/ajith-ram-1048763",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362520.4.jpg"
		],
		"guruswamy ajitesh": [
			"https://www.espncricinfo.com/cricketers/guruswamy-ajitesh-1320758",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362426.4.jpg"
		],
		"m ajinas": [
			"https://www.espncricinfo.com/cricketers/m-ajinas-1403213",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"kukna ajay singh": [
			"https://www.espncricinfo.com/cricketers/kukna-ajay-singh-923639",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ajay kumar": [
			"https://www.espncricinfo.com/cricketers/ajay-kumar-1324474",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ajay krishna": [
			"https://www.espncricinfo.com/cricketers/ajay-krishna-1320774",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362590.4.jpg"
		],
		"suraj ahuja": [
			"https://www.espncricinfo.com/cricketers/suraj-ahuja-1081218",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/287300/287308.1.jpg"
		],
		"kanika ahuja": [
			"https://www.espncricinfo.com/cricketers/kanika-ahuja-1255560",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"khaleel ahmed": [
			"https://www.espncricinfo.com/cricketers/khaleel-ahmed-942645",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315000/315022.jpg"
		],
		"ahmed shah": [
			"https://www.espncricinfo.com/cricketers/ahmed-shah-1170229",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314953.jpg"
		],
		"anup ahlawat": [
			"https://www.espncricinfo.com/cricketers/anup-ahlawat-1351303",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"ruchit ahir": [
			"https://www.espncricinfo.com/cricketers/ruchit-ahir-1395884",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"anubhav agarwal": [
			"https://www.espncricinfo.com/cricketers/anubhav-agarwal-1292532",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tanmay agarwal": [
			"https://www.espncricinfo.com/cricketers/tanmay-agarwal-792725",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314700/314791.jpg"
		],
		"shubham agarwal": [
			"https://www.espncricinfo.com/cricketers/shubham-agarwal-1079668",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314916.jpg"
		],
		"mayank agarwal": [
			"https://www.espncricinfo.com/cricketers/mayank-agarwal-398438",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302300/302377.jpg"
		],
		"aditya mani": [
			"https://www.espncricinfo.com/cricketers/aditya-mani-1392192",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aditya jadeja": [
			"https://www.espncricinfo.com/cricketers/aditya-jadeja-1300584",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"adithya ganesh": [
			"https://www.espncricinfo.com/cricketers/adithya-ganesh-1048797",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362300/362351.4.jpg"
		],
		"jeswath acharya": [
			"https://www.espncricinfo.com/cricketers/jeswath-acharya-1058751",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shreesha achar": [
			"https://www.espncricinfo.com/cricketers/shreesha-achar-1199063",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abul hasan khalid": [
			"https://www.espncricinfo.com/cricketers/abul-hasan-khalid-1392184",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"s abishiek": [
			"https://www.espncricinfo.com/cricketers/s-abishiek-1048823",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362400/362400.4.jpg"
		],
		"abishek porel": [
			"https://www.espncricinfo.com/cricketers/abishek-porel-1277545",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380667.1.png"
		],
		"abin mathew": [
			"https://www.espncricinfo.com/cricketers/abin-mathew-1273852",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abid mushtaq": [
			"https://www.espncricinfo.com/cricketers/abid-mushtaq-1201536",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"murugan abhishek": [
			"https://www.espncricinfo.com/cricketers/murugan-abhishek-1408681",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek yadav": [
			"https://www.espncricinfo.com/cricketers/abhishek-yadav-955087",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek singh": [
			"https://www.espncricinfo.com/cricketers/abhishek-singh-1403214",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek sharma": [
			"https://www.espncricinfo.com/cricketers/abhishek-sharma-1070183",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356824.1.png"
		],
		"abhishek pradhan": [
			"https://www.espncricinfo.com/cricketers/abhishek-pradhan-1384932",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek kumar": [
			"https://www.espncricinfo.com/cricketers/abhishek-kumar-1339015",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhishek goswami": [
			"https://www.espncricinfo.com/cricketers/abhishek-goswami-1081436",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhirath reddy": [
			"https://www.espncricinfo.com/cricketers/abhirath-reddy-1246434",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314800/314812.jpg"
		],
		"kanwar abhinay": [
			"https://www.espncricinfo.com/cricketers/kanwar-abhinay-594566",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/314900/314996.jpg"
		],
		"munnangi abhinav": [
			"https://www.espncricinfo.com/cricketers/munnangi-abhinav-1324485",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhinav puri": [
			"https://www.espncricinfo.com/cricketers/abhinav-puri-943039",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhilash shetty": [
			"https://www.espncricinfo.com/cricketers/abhilash-shetty-1155401",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abhijeet saket": [
			"https://www.espncricinfo.com/cricketers/abhijeet-saket-1163686",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/298800/298879.1.jpg"
		],
		"abhijeet garg": [
			"https://www.espncricinfo.com/cricketers/abhijeet-garg-1166010",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"tharayil abeesh": [
			"https://www.espncricinfo.com/cricketers/tharayil-abeesh-1273886",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abdul samad": [
			"https://www.espncricinfo.com/cricketers/abdul-samad-1175485",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/295300/295304.jpg"
		],
		"abdul basith": [
			"https://www.espncricinfo.com/cricketers/abdul-basith-1287067",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"abdul ajij kuraishi": [
			"https://www.espncricinfo.com/cricketers/abdul-ajij-kuraishi-1421153",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"shaik abbas": [
			"https://www.espncricinfo.com/cricketers/shaik-abbas-1324514",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"aarya desai": [
			"https://www.espncricinfo.com/cricketers/aarya-desai-1353014",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"varun aaron": [
			"https://www.espncricinfo.com/cricketers/varun-aaron-360911",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/181800/181829.1.jpg"
		],
		"aaqib khan": [
			"https://www.espncricinfo.com/cricketers/aaqib-khan-1207680",
			"https://wassets.hscicdn.com/static/images/player-jersey.svg"
		],
		"v aaditya": [
			"https://www.espncricinfo.com/cricketers/v-aaditya-1269873",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/362500/362589.4.jpg"
		],
		"zubaid akbari": [
			"https://www.espncricinfo.com/cricketers/zubaid-akbari-1015437",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"zia-ur-rehman": [
			"https://www.espncricinfo.com/cricketers/zia-ur-rehman-633374",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179000/179065.1.jpg"
		],
		"zahir khan": [
			"https://www.espncricinfo.com/cricketers/zahir-khan-712219",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303292.jpg"
		],
		"yamin ahmadzai": [
			"https://www.espncricinfo.com/cricketers/yamin-ahmadzai-440968",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327600/327678.1.jpg"
		],
		"wafadar momand": [
			"https://www.espncricinfo.com/cricketers/wafadar-momand-973945",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/277700/277738.1.jpg"
		],
		"sharafuddin ashraf": [
			"https://www.espncricinfo.com/cricketers/sharafuddin-ashraf-633362",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303289.jpg"
		],
		"shahidullah": [
			"https://www.espncricinfo.com/cricketers/shahidullah-633366",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179000/179055.1.jpg"
		],
		"sediqullah atal": [
			"https://www.espncricinfo.com/cricketers/sediqullah-atal-1161050",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"riaz hassan": [
			"https://www.espncricinfo.com/cricketers/riaz-hassan-1061090",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/368100/368151.1.png"
		],
		"rashid khan": [
			"https://www.espncricinfo.com/cricketers/rashid-khan-793463",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289200/289234.1.jpg"
		],
		"rahmat shah": [
			"https://www.espncricinfo.com/cricketers/rahmat-shah-533956",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303287.jpg"
		],
		"rahmanullah gurbaz": [
			"https://www.espncricinfo.com/cricketers/rahmanullah-gurbaz-974087",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/357000/357020.1.png"
		],
		"qais ahmad": [
			"https://www.espncricinfo.com/cricketers/qais-ahmad-914171",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296500/296532.1.jpg"
		],
		"noor ali zadran": [
			"https://www.espncricinfo.com/cricketers/noor-ali-zadran-318340",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/235900/235937.1.jpg"
		],
		"noor ahmad": [
			"https://www.espncricinfo.com/cricketers/noor-ahmad-1182529",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382016.1.jpg"
		],
		"nijat masood": [
			"https://www.espncricinfo.com/cricketers/nijat-masood-913843",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/365900/365980.1.png"
		],
		"naveen-ul-haq": [
			"https://www.espncricinfo.com/cricketers/naveen-ul-haq-793447",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381927.2.jpg"
		],
		"naveed zadran": [
			"https://www.espncricinfo.com/cricketers/naveed-zadran-1276921",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341066.4.jpg"
		],
		"nasir jamal": [
			"https://www.espncricinfo.com/cricketers/nasir-jamal-524048",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/267200/267234.1.jpg"
		],
		"nangeyalia kharote": [
			"https://www.espncricinfo.com/cricketers/nangeyalia-kharote-1199434",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341065.4.jpg"
		],
		"najibullah zadran": [
			"https://www.espncricinfo.com/cricketers/najibullah-zadran-524049",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381935.1.jpg"
		],
		"mujeeb ur rahman": [
			"https://www.espncricinfo.com/cricketers/mujeeb-ur-rahman-974109",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381931.1.jpg"
		],
		"mohammad shahzad": [
			"https://www.espncricinfo.com/cricketers/mohammad-shahzad-419873",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303281.jpg"
		],
		"mohammad saleem": [
			"https://www.espncricinfo.com/cricketers/mohammad-saleem-1174749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/347800/347834.4.jpg"
		],
		"mohammad nabi": [
			"https://www.espncricinfo.com/cricketers/mohammad-nabi-25913",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381920.1.jpg"
		],
		"mohammad ishaq": [
			"https://www.espncricinfo.com/cricketers/mohammad-ishaq-1076579",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341064.4.jpg"
		],
		"karim janat": [
			"https://www.espncricinfo.com/cricketers/karim-janat-793467",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381919.1.jpg"
		],
		"ikram alikhil": [
			"https://www.espncricinfo.com/cricketers/ikram-alikhil-935553",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303275.jpg"
		],
		"ijaz ahmad ahmadzai": [
			"https://www.espncricinfo.com/cricketers/ijaz-ahmad-ahmadzai-1276922",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341055.4.jpg"
		],
		"ibrahim zadran": [
			"https://www.espncricinfo.com/cricketers/ibrahim-zadran-921509",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381921.2.jpg"
		],
		"hazratullah zazai": [
			"https://www.espncricinfo.com/cricketers/hazratullah-zazai-793457",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289600/289664.1.jpg"
		],
		"hashmatullah shahidi": [
			"https://www.espncricinfo.com/cricketers/hashmatullah-shahidi-440970",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303271.jpg"
		],
		"gulbadin naib": [
			"https://www.espncricinfo.com/cricketers/gulbadin-naib-352048",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381925.1.jpg"
		],
		"am ghazanfar": [
			"https://www.espncricinfo.com/cricketers/am-ghazanfar-1326798",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380676.4.jpg"
		],
		"fazalhaq farooqi": [
			"https://www.espncricinfo.com/cricketers/fazalhaq-farooqi-974175",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381932.2.jpg"
		],
		"fareed ahmad": [
			"https://www.espncricinfo.com/cricketers/fareed-ahmad-568136",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381900/381923.1.jpg"
		],
		"darwish rasooli": [
			"https://www.espncricinfo.com/cricketers/darwish-rasooli-819441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/347800/347833.4.jpg"
		],
		"bahir shah": [
			"https://www.espncricinfo.com/cricketers/bahir-shah-976571",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271600/271642.1.jpg"
		],
		"azmatullah omarzai": [
			"https://www.espncricinfo.com/cricketers/azmatullah-omarzai-819429",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/347800/347832.4.jpg"
		],
		"amir hamza": [
			"https://www.espncricinfo.com/cricketers/amir-hamza-402245",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/181200/181271.jpg"
		],
		"afsar zazai": [
			"https://www.espncricinfo.com/cricketers/afsar-zazai-420402",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303258.jpg"
		],
		"abdul rahman": [
			"https://www.espncricinfo.com/cricketers/abdul-rahman-819507",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/368100/368152.1.png"
		],
		"abdul malik": [
			"https://www.espncricinfo.com/cricketers/abdul-malik-1059030",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/363300/363335.1.png"
		],
		"adam zampa": [
			"https://www.espncricinfo.com/cricketers/adam-zampa-379504",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263543.1.jpg"
		],
		"david warner": [
			"https://www.espncricinfo.com/cricketers/david-warner-219889",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263541.1.jpg"
		],
		"georgia wareham": [
			"https://www.espncricinfo.com/cricketers/georgia-wareham-946057",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300500/300592.1.jpg"
		],
		"matthew wade": [
			"https://www.espncricinfo.com/cricketers/matthew-wade-230193",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263523.1.jpg"
		],
		"tayla vlaeminck": [
			"https://www.espncricinfo.com/cricketers/tayla-vlaeminck-1071711",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282000/282061.1.jpg"
		],
		"ashton turner": [
			"https://www.espncricinfo.com/cricketers/ashton-turner-500268",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148100/148141.1.jpg"
		],
		"will sutherland": [
			"https://www.espncricinfo.com/cricketers/will-sutherland-1076722",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350300/350320.4.jpg"
		],
		"annabel sutherland": [
			"https://www.espncricinfo.com/cricketers/annabel-sutherland-1071705",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300500/300583.4.jpg"
		],
		"marcus stoinis": [
			"https://www.espncricinfo.com/cricketers/marcus-stoinis-325012",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309100/309100.jpg"
		],
		"mitchell starc": [
			"https://www.espncricinfo.com/cricketers/mitchell-starc-311592",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263529.1.jpg"
		],
		"steven smith": [
			"https://www.espncricinfo.com/cricketers/steven-smith-267192",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309500/309571.1.jpg"
		],
		"matthew short": [
			"https://www.espncricinfo.com/cricketers/matthew-short-605575",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/379000/379039.4.jpg"
		],
		"megan schutt": [
			"https://www.espncricinfo.com/cricketers/megan-schutt-420314",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282400/282464.1.jpg"
		],
		"tanveer sangha": [
			"https://www.espncricinfo.com/cricketers/tanveer-sangha-1170471",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"kane richardson": [
			"https://www.espncricinfo.com/cricketers/kane-richardson-272262",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289900/289954.jpg"
		],
		"josh philippe": [
			"https://www.espncricinfo.com/cricketers/josh-philippe-1124282",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308700/308748.jpg"
		],
		"ellyse perry": [
			"https://www.espncricinfo.com/cricketers/ellyse-perry-275487",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282400/282462.1.jpg"
		],
		"michael neser": [
			"https://www.espncricinfo.com/cricketers/michael-neser-376169",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312158.png"
		],
		"todd murphy": [
			"https://www.espncricinfo.com/cricketers/todd-murphy-1193685",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353923.4.jpg"
		],
		"lance morris": [
			"https://www.espncricinfo.com/cricketers/lance-morris-1125317",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350300/350374.4.jpg"
		],
		"beth mooney": [
			"https://www.espncricinfo.com/cricketers/beth-mooney-381258",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/182400/182467.1.jpg"
		],
		"sophie molineux": [
			"https://www.espncricinfo.com/cricketers/sophie-molineux-944373",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305800/305813.jpg"
		],
		"tahlia mcgrath": [
			"https://www.espncricinfo.com/cricketers/tahlia-mcgrath-381311",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305800/305808.jpg"
		],
		"ben mcdermott": [
			"https://www.espncricinfo.com/cricketers/ben-mcdermott-603410",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179400/179423.1.jpg"
		],
		"glenn maxwell": [
			"https://www.espncricinfo.com/cricketers/glenn-maxwell-325026",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263539.1.jpg"
		],
		"mitchell marsh": [
			"https://www.espncricinfo.com/cricketers/mitchell-marsh-272450",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356780.1.png"
		],
		"nathan lyon": [
			"https://www.espncricinfo.com/cricketers/nathan-lyon-272279",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289900/289952.jpg"
		],
		"phoebe litchfield": [
			"https://www.espncricinfo.com/cricketers/phoebe-litchfield-1176132",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/366300/366328.4.jpg"
		],
		"marnus labuschagne": [
			"https://www.espncricinfo.com/cricketers/marnus-labuschagne-787987",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/281100/281119.1.jpg"
		],
		"alana king": [
			"https://www.espncricinfo.com/cricketers/alana-king-944393",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334893.4.jpg"
		],
		"usman khawaja": [
			"https://www.espncricinfo.com/cricketers/usman-khawaja-215155",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289900/289951.jpg"
		],
		"jess jonassen": [
			"https://www.espncricinfo.com/cricketers/jess-jonassen-374936",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/150200/150218.1.jpg"
		],
		"spencer johnson": [
			"https://www.espncricinfo.com/cricketers/spencer-johnson-1123718",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/374500/374591.1.png"
		],
		"josh inglis": [
			"https://www.espncricinfo.com/cricketers/josh-inglis-662235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313648.1.jpg"
		],
		"alyssa healy": [
			"https://www.espncricinfo.com/cricketers/alyssa-healy-275486",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/150200/150224.1.jpg"
		],
		"travis head": [
			"https://www.espncricinfo.com/cricketers/travis-head-530011",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263525.1.jpg"
		],
		"josh hazlewood": [
			"https://www.espncricinfo.com/cricketers/josh-hazlewood-288284",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263531.1.jpg"
		],
		"grace harris": [
			"https://www.espncricinfo.com/cricketers/grace-harris-381268",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/346900/346946.4.jpg"
		],
		"aaron hardie": [
			"https://www.espncricinfo.com/cricketers/aaron-hardie-1124283",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313651.1.jpg"
		],
		"chris green": [
			"https://www.espncricinfo.com/cricketers/chris-green-787073",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309059.png"
		],
		"cameron green": [
			"https://www.espncricinfo.com/cricketers/cameron-green-1076713",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315600/315603.jpg"
		],
		"heather graham": [
			"https://www.espncricinfo.com/cricketers/heather-graham-546629",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324900/324997.4.jpg"
		],
		"kim garth": [
			"https://www.espncricinfo.com/cricketers/kim-garth-418423",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/366300/366334.4.jpg"
		],
		"ashleigh gardner": [
			"https://www.espncricinfo.com/cricketers/ashleigh-gardner-858809",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282400/282465.1.jpg"
		],
		"jake fraser-mcgurk": [
			"https://www.espncricinfo.com/cricketers/jake-fraser-mcgurk-1168049",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/299800/299893.1.jpg"
		],
		"nathan ellis": [
			"https://www.espncricinfo.com/cricketers/nathan-ellis-826915",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327000/327014.4.jpg"
		],
		"ben dwarshuis": [
			"https://www.espncricinfo.com/cricketers/ben-dwarshuis-679567",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/220000/220099.1.jpg"
		],
		"tim david": [
			"https://www.espncricinfo.com/cricketers/tim-david-892749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313639.1.jpg"
		],
		"pat cummins": [
			"https://www.espncricinfo.com/cricketers/pat-cummins-489889",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/309000/309079.png"
		],
		"lauren cheatle": [
			"https://www.espncricinfo.com/cricketers/lauren-cheatle-858811",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/239100/239145.jpg"
		],
		"alex carey": [
			"https://www.espncricinfo.com/cricketers/alex-carey-326434",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289900/289949.jpg"
		],
		"darcie brown": [
			"https://www.espncricinfo.com/cricketers/darcie-brown-388845",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324714.4.jpg"
		],
		"scott boland": [
			"https://www.espncricinfo.com/cricketers/scott-boland-446548",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/361100/361197.jpg"
		],
		"jason behrendorff": [
			"https://www.espncricinfo.com/cricketers/jason-behrendorff-272477",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289900/289948.jpg"
		],
		"xavier bartlett": [
			"https://www.espncricinfo.com/cricketers/xavier-bartlett-1050545",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271700/271775.jpg"
		],
		"ashton agar": [
			"https://www.espncricinfo.com/cricketers/ashton-agar-505120",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312154.png"
		],
		"sean abbott": [
			"https://www.espncricinfo.com/cricketers/sean-abbott-398666",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312161.png"
		],
		"zakir hasan": [
			"https://www.espncricinfo.com/cricketers/zakir-hasan-697059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/371500/371519.1.png"
		],
		"yasir ali": [
			"https://www.espncricinfo.com/cricketers/yasir-ali-629059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179500/179555.1.jpg"
		],
		"towhid hridoy": [
			"https://www.espncricinfo.com/cricketers/towhid-hridoy-990031",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377579.4.jpg"
		],
		"taskin ahmed": [
			"https://www.espncricinfo.com/cricketers/taskin-ahmed-538506",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303169.jpg"
		],
		"tanzim hasan sakib": [
			"https://www.espncricinfo.com/cricketers/tanzim-hasan-sakib-1139520",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377584.4.jpg"
		],
		"tanzid hasan": [
			"https://www.espncricinfo.com/cricketers/tanzid-hasan-990023",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/368000/368062.1.png"
		],
		"tanvir islam": [
			"https://www.espncricinfo.com/cricketers/tanvir-islam-932665",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381600/381682.4.jpg"
		],
		"tamim iqbal": [
			"https://www.espncricinfo.com/cricketers/tamim-iqbal-56194",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303166.jpg"
		],
		"taijul islam": [
			"https://www.espncricinfo.com/cricketers/taijul-islam-401057",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303164.jpg"
		],
		"sumon khan": [
			"https://www.espncricinfo.com/cricketers/sumon-khan-1163490",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"sumaiya akter": [
			"https://www.espncricinfo.com/cricketers/sumaiya-akter-1352210",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377900/377996.4.jpg"
		],
		"sultana khatun": [
			"https://www.espncricinfo.com/cricketers/sultana-khatun-1371855",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377900/377998.4.jpg"
		],
		"soumya sarkar": [
			"https://www.espncricinfo.com/cricketers/soumya-sarkar-436677",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381600/381681.4.jpg"
		],
		"shorna akter": [
			"https://www.espncricinfo.com/cricketers/shorna-akter-1352206",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352484.4.jpg"
		],
		"shoriful islam": [
			"https://www.espncricinfo.com/cricketers/shoriful-islam-990039",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286900/286908.1.jpg"
		],
		"shorifa khatun": [
			"https://www.espncricinfo.com/cricketers/shorifa-khatun-1405159",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"sharmin akhter": [
			"https://www.espncricinfo.com/cricketers/sharmin-akhter-535868",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305380.png"
		],
		"shamima sultana": [
			"https://www.espncricinfo.com/cricketers/shamima-sultana-535870",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305381.png"
		],
		"shamim hossain": [
			"https://www.espncricinfo.com/cricketers/shamim-hossain-1161044",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/326600/326637.4.jpg"
		],
		"shakib al hasan": [
			"https://www.espncricinfo.com/cricketers/shakib-al-hasan-56143",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303157.jpg"
		],
		"shahadat hossain": [
			"https://www.espncricinfo.com/cricketers/shahadat-hossain-989935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/371900/371954.1.png"
		],
		"sanjida akter meghla": [
			"https://www.espncricinfo.com/cricketers/sanjida-akter-meghla-1205142",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332700/332748.4.jpg"
		],
		"salma khatun": [
			"https://www.espncricinfo.com/cricketers/salma-khatun-301603",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305377.png"
		],
		"saif hassan": [
			"https://www.espncricinfo.com/cricketers/saif-hassan-821749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303248.jpg"
		],
		"rubya haider": [
			"https://www.espncricinfo.com/cricketers/rubya-haider-1204963",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rony talukdar": [
			"https://www.espncricinfo.com/cricketers/rony-talukdar-300617",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/198100/198127.1.jpg"
		],
		"ritu moni": [
			"https://www.espncricinfo.com/cricketers/ritu-moni-478808",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305375.png"
		],
		"rishad hossain": [
			"https://www.espncricinfo.com/cricketers/rishad-hossain-1139523",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377577.4.jpg"
		],
		"shathi rani": [
			"https://www.espncricinfo.com/cricketers/shathi-rani-1380052",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rakibul hasan": [
			"https://www.espncricinfo.com/cricketers/rakibul-hasan-1012131",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rabeya khan": [
			"https://www.espncricinfo.com/cricketers/rabeya-khan-1204964",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377900/377994.4.jpg"
		],
		"parvez hossain emon": [
			"https://www.espncricinfo.com/cricketers/parvez-hossain-emon-1139511",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"nurul hasan": [
			"https://www.espncricinfo.com/cricketers/nurul-hasan-410765",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303243.jpg"
		],
		"nishita akter nishi": [
			"https://www.espncricinfo.com/cricketers/nishita-akter-nishi-1352217",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377900/377995.4.jpg"
		],
		"nigar sultana": [
			"https://www.espncricinfo.com/cricketers/nigar-sultana-924177",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305372.png"
		],
		"nayeem hasan": [
			"https://www.espncricinfo.com/cricketers/nayeem-hasan-932635",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/269500/269532.1.jpg"
		],
		"nasum ahmed": [
			"https://www.espncricinfo.com/cricketers/nasum-ahmed-348049",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148300/148317.1.jpg"
		],
		"najmul hossain shanto": [
			"https://www.espncricinfo.com/cricketers/najmul-hossain-shanto-629058",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381600/381683.4.jpg"
		],
		"nahida akter": [
			"https://www.espncricinfo.com/cricketers/nahida-akter-924183",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305371.png"
		],
		"nahid rana": [
			"https://www.espncricinfo.com/cricketers/nahid-rana-1210511",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mustafizur rahman": [
			"https://www.espncricinfo.com/cricketers/mustafizur-rahman-330902",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263578.jpg"
		],
		"mushfiqur rahim": [
			"https://www.espncricinfo.com/cricketers/mushfiqur-rahim-56029",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303148.jpg"
		],
		"murshida khatun": [
			"https://www.espncricinfo.com/cricketers/murshida-khatun-1080264",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305370.png"
		],
		"mrittunjoy chowdhury": [
			"https://www.espncricinfo.com/cricketers/mrittunjoy-chowdhury-1012137",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350000/350096.4.jpg"
		],
		"sobhana mostary": [
			"https://www.espncricinfo.com/cricketers/sobhana-mostary-1145089",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305382.png"
		],
		"ripon mondol": [
			"https://www.espncricinfo.com/cricketers/ripon-mondol-1276980",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mominul haque": [
			"https://www.espncricinfo.com/cricketers/mominul-haque-373696",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303100/303146.jpg"
		],
		"mohammad saifuddin": [
			"https://www.espncricinfo.com/cricketers/mohammad-saifuddin-629070",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303236.jpg"
		],
		"mohammad naim": [
			"https://www.espncricinfo.com/cricketers/mohammad-naim-990081",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303235.jpg"
		],
		"mehidy hasan miraz": [
			"https://www.espncricinfo.com/cricketers/mehidy-hasan-miraz-629063",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303000/303000.jpg"
		],
		"marufa akter": [
			"https://www.espncricinfo.com/cricketers/marufa-akter-1332561",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352490.4.jpg"
		],
		"mahmudullah": [
			"https://www.espncricinfo.com/cricketers/mahmudullah-56025",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263500/263581.jpg"
		],
		"mahmudul hasan joy": [
			"https://www.espncricinfo.com/cricketers/mahmudul-hasan-joy-1161381",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341047.4.jpg"
		],
		"mahedi hasan": [
			"https://www.espncricinfo.com/cricketers/mahedi-hasan-833087",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/377500/377581.4.jpg"
		],
		"litton das": [
			"https://www.espncricinfo.com/cricketers/litton-das-536936",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302900/302995.jpg"
		],
		"lata mondal": [
			"https://www.espncricinfo.com/cricketers/lata-mondal-346295",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305369.png"
		],
		"khaled ahmed": [
			"https://www.espncricinfo.com/cricketers/khaled-ahmed-927619",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349300/349342.png"
		],
		"jaker ali": [
			"https://www.espncricinfo.com/cricketers/jaker-ali-824541",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/349300/349343.png"
		],
		"hasan murad": [
			"https://www.espncricinfo.com/cricketers/hasan-murad-990161",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/372000/372008.1.png"
		],
		"hasan mahmud": [
			"https://www.espncricinfo.com/cricketers/hasan-mahmud-926629",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303200/303249.jpg"
		],
		"habiba islam": [
			"https://www.espncricinfo.com/cricketers/habiba-islam-1429513",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"fariha trisna": [
			"https://www.espncricinfo.com/cricketers/fariha-trisna-1195124",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335100/335124.4.jpg"
		],
		"fargana hoque": [
			"https://www.espncricinfo.com/cricketers/fargana-hoque-486995",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305366.png"
		],
		"fahima khatun": [
			"https://www.espncricinfo.com/cricketers/fahima-khatun-627048",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305300/305365.png"
		],
		"ebadot hossain": [
			"https://www.espncricinfo.com/cricketers/ebadot-hossain-932355",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341045.4.jpg"
		],
		"dilara akter": [
			"https://www.espncricinfo.com/cricketers/dilara-akter-1346729",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352489.4.jpg"
		],
		"anamul haque": [
			"https://www.espncricinfo.com/cricketers/anamul-haque-380354",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302900/302976.jpg"
		],
		"afif hossain": [
			"https://www.espncricinfo.com/cricketers/afif-hossain-935995",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306000/306068.1.jpg"
		],
		"danni wyatt": [
			"https://www.espncricinfo.com/cricketers/danni-wyatt-254168",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305146.png"
		],
		"mark wood": [
			"https://www.espncricinfo.com/cricketers/mark-wood-351588",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303977.jpg"
		],
		"luke wood": [
			"https://www.espncricinfo.com/cricketers/luke-wood-573170",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179000/179005.1.jpg"
		],
		"issy wong": [
			"https://www.espncricinfo.com/cricketers/issy-wong-1146066",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324741.4.jpg"
		],
		"chris woakes": [
			"https://www.espncricinfo.com/cricketers/chris-woakes-247235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304336.jpg"
		],
		"david willey": [
			"https://www.espncricinfo.com/cricketers/david-willey-308251",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305028.jpg"
		],
		"reece topley": [
			"https://www.espncricinfo.com/cricketers/reece-topley-461632",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356811.1.png"
		],
		"josh tongue": [
			"https://www.espncricinfo.com/cricketers/josh-tongue-857975",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/261600/261606.1.jpg"
		],
		"ben stokes": [
			"https://www.espncricinfo.com/cricketers/ben-stokes-311158",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305019.jpg"
		],
		"linsey smith": [
			"https://www.espncricinfo.com/cricketers/linsey-smith-517577",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305185.png"
		],
		"jamie smith": [
			"https://www.espncricinfo.com/cricketers/jamie-smith-1096092",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296200/296213.1.jpg"
		],
		"shoaib bashir": [
			"https://www.espncricinfo.com/cricketers/shoaib-bashir-1334872",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/379000/379038.4.jpg"
		],
		"george scrimshaw": [
			"https://www.espncricinfo.com/cricketers/george-scrimshaw-857979",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/360400/360413.1.jpg"
		],
		"phil salt": [
			"https://www.espncricinfo.com/cricketers/phil-salt-669365",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312181.png"
		],
		"joe root": [
			"https://www.espncricinfo.com/cricketers/joe-root-303669",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303966.jpg"
		],
		"ollie robinson": [
			"https://www.espncricinfo.com/cricketers/ollie-robinson-527776",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296100/296181.1.jpg"
		],
		"rehan ahmed": [
			"https://www.espncricinfo.com/cricketers/rehan-ahmed-1263691",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345227.4.jpg"
		],
		"adil rashid": [
			"https://www.espncricinfo.com/cricketers/adil-rashid-244497",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289600/289662.1.jpg"
		],
		"matthew potts": [
			"https://www.espncricinfo.com/cricketers/matthew-potts-1027781",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302400/302421.1.jpg"
		],
		"ollie pope": [
			"https://www.espncricinfo.com/cricketers/ollie-pope-887207",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303990.jpg"
		],
		"nat sciver-brunt": [
			"https://www.espncricinfo.com/cricketers/nat-sciver-brunt-515905",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305060.jpg"
		],
		"tymal mills": [
			"https://www.espncricinfo.com/cricketers/tymal-mills-459257",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305042.jpg"
		],
		"dawid malan": [
			"https://www.espncricinfo.com/cricketers/dawid-malan-236489",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304600/304668.jpg"
		],
		"liam livingstone": [
			"https://www.espncricinfo.com/cricketers/liam-livingstone-403902",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356700/356798.1.png"
		],
		"jack leach": [
			"https://www.espncricinfo.com/cricketers/jack-leach-455524",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303959.jpg"
		],
		"emma lamb": [
			"https://www.espncricinfo.com/cricketers/emma-lamb-749957",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324788.4.jpg"
		],
		"heather knight": [
			"https://www.espncricinfo.com/cricketers/heather-knight-358259",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304900/304980.png"
		],
		"freya kemp": [
			"https://www.espncricinfo.com/cricketers/freya-kemp-1195947",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"chris jordan": [
			"https://www.espncricinfo.com/cricketers/chris-jordan-288992",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303926.jpg"
		],
		"amy jones": [
			"https://www.espncricinfo.com/cricketers/amy-jones-515874",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304800/304895.png"
		],
		"will jacks": [
			"https://www.espncricinfo.com/cricketers/will-jacks-897549",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296200/296209.1.jpg"
		],
		"bess heath": [
			"https://www.espncricinfo.com/cricketers/bess-heath-916037",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327900/327979.7.jpg"
		],
		"tom hartley": [
			"https://www.espncricinfo.com/cricketers/tom-hartley-1150772",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/320900/320978.1.jpg"
		],
		"sam hain": [
			"https://www.espncricinfo.com/cricketers/sam-hain-555850",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/157100/157175.1.jpg"
		],
		"sarah glenn": [
			"https://www.espncricinfo.com/cricketers/sarah-glenn-885837",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305200/305203.png"
		],
		"danielle gibson": [
			"https://www.espncricinfo.com/cricketers/danielle-gibson-886203",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/364900/364940.4.jpg"
		],
		"mahika gaur": [
			"https://www.espncricinfo.com/cricketers/mahika-gaur-1171433",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/366200/366238.4.jpg"
		],
		"ben foakes": [
			"https://www.espncricinfo.com/cricketers/ben-foakes-364788",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304272.jpg"
		],
		"lauren filer": [
			"https://www.espncricinfo.com/cricketers/lauren-filer-1146129",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"sophie ecclestone": [
			"https://www.espncricinfo.com/cricketers/sophie-ecclestone-878039",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"sophia dunkley": [
			"https://www.espncricinfo.com/cricketers/sophia-dunkley-885815",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"ben duckett": [
			"https://www.espncricinfo.com/cricketers/ben-duckett-521637",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"charlie dean": [
			"https://www.espncricinfo.com/cricketers/charlie-dean-1039421",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"freya davies": [
			"https://www.espncricinfo.com/cricketers/freya-davies-652945",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"alice davidson-richards": [
			"https://www.espncricinfo.com/cricketers/alice-davidson-richards-515876",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305127.png"
		],
		"sam curran": [
			"https://www.espncricinfo.com/cricketers/sam-curran-662973",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304300/304324.jpg"
		],
		"kate cross": [
			"https://www.espncricinfo.com/cricketers/kate-cross-297085",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304900/304993.png"
		],
		"zak crawley": [
			"https://www.espncricinfo.com/cricketers/zak-crawley-665053",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304000/304016.jpg"
		],
		"brydon carse": [
			"https://www.espncricinfo.com/cricketers/brydon-carse-596417",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/325900/325920.4.jpg"
		],
		"alice capsey": [
			"https://www.espncricinfo.com/cricketers/alice-capsey-1187120",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324797.4.jpg"
		],
		"jos buttler": [
			"https://www.espncricinfo.com/cricketers/jos-buttler-308967",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303969.jpg"
		],
		"harry brook": [
			"https://www.espncricinfo.com/cricketers/harry-brook-911707",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271800/271830.jpg"
		],
		"stuart broad": [
			"https://www.espncricinfo.com/cricketers/stuart-broad-10617",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305005.jpg"
		],
		"maia bouchier": [
			"https://www.espncricinfo.com/cricketers/maia-bouchier-1022077",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/378400/378442.1.png"
		],
		"lauren bell": [
			"https://www.espncricinfo.com/cricketers/lauren-bell-878025",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354100/354145.1.png"
		],
		"tammy beaumont": [
			"https://www.espncricinfo.com/cricketers/tammy-beaumont-297074",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305069.png"
		],
		"jonny bairstow": [
			"https://www.espncricinfo.com/cricketers/jonny-bairstow-297433",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304900/304906.jpg"
		],
		"gus atkinson": [
			"https://www.espncricinfo.com/cricketers/gus-atkinson-1039481",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/296200/296215.1.jpg"
		],
		"hollie armitage": [
			"https://www.espncricinfo.com/cricketers/hollie-armitage-715351",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327900/327980.4.jpg"
		],
		"jofra archer": [
			"https://www.espncricinfo.com/cricketers/jofra-archer-669855",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305000/305033.jpg"
		],
		"james anderson": [
			"https://www.espncricinfo.com/cricketers/james-anderson-8608",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/243000/243027.jpg"
		],
		"moeen ali": [
			"https://www.espncricinfo.com/cricketers/moeen-ali-8917",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289600/289661.1.jpg"
		],
		"craig young": [
			"https://www.espncricinfo.com/cricketers/craig-young-364343",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/367800/367864.4.jpg"
		],
		"ben white": [
			"https://www.espncricinfo.com/cricketers/ben-white-928059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382120.1.jpg"
		],
		"mary waldron": [
			"https://www.espncricinfo.com/cricketers/mary-waldron-463208",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/182000/182017.jpg"
		],
		"theo van woerkom": [
			"https://www.espncricinfo.com/cricketers/theo-van-woerkom-547760",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/367800/367865.4.jpg"
		],
		"lorcan tucker": [
			"https://www.espncricinfo.com/cricketers/lorcan-tucker-928057",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382117.1.jpg"
		],
		"harry tector": [
			"https://www.espncricinfo.com/cricketers/harry-tector-961407",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382116.1.jpg"
		],
		"rebecca stokell": [
			"https://www.espncricinfo.com/cricketers/rebecca-stokell-1094717",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282200/282277.1.jpg"
		],
		"paul stirling": [
			"https://www.espncricinfo.com/cricketers/paul-stirling-303427",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382118.1.jpg"
		],
		"freya sargent": [
			"https://www.espncricinfo.com/cricketers/freya-sargent-1229016",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"neil rock": [
			"https://www.espncricinfo.com/cricketers/neil-rock-1112535",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382115.1.jpg"
		],
		"eimear richardson": [
			"https://www.espncricinfo.com/cricketers/eimear-richardson-54945",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/181900/181915.jpg"
		],
		"orla prendergast": [
			"https://www.espncricinfo.com/cricketers/orla-prendergast-1150585",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306700/306792.jpg"
		],
		"leah paul": [
			"https://www.espncricinfo.com/cricketers/leah-paul-1026403",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/333100/333184.1.jpg"
		],
		"cara murray": [
			"https://www.espncricinfo.com/cricketers/cara-murray-1135028",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334900/334987.2.jpg"
		],
		"peter moor": [
			"https://www.espncricinfo.com/cricketers/peter-moor-333000",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/235600/235677.1.jpg"
		],
		"barry mccarthy": [
			"https://www.espncricinfo.com/cricketers/barry-mccarthy-348059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305200/305253.jpg"
		],
		"andy mcbrine": [
			"https://www.espncricinfo.com/cricketers/andy-mcbrine-417381",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305200/305252.jpg"
		],
		"jane maguire": [
			"https://www.espncricinfo.com/cricketers/jane-maguire-1229018",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334900/334986.2.jpg"
		],
		"aimee maguire": [
			"https://www.espncricinfo.com/cricketers/aimee-maguire-1351945",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"sophie macmahon": [
			"https://www.espncricinfo.com/cricketers/sophie-macmahon-1094720",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/321600/321625.png"
		],
		"joanna loughran": [
			"https://www.espncricinfo.com/cricketers/joanna-loughran-1351943",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"louise little": [
			"https://www.espncricinfo.com/cricketers/louise-little-1094718",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334900/334990.2.jpg"
		],
		"josh little": [
			"https://www.espncricinfo.com/cricketers/josh-little-928067",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/367800/367863.4.jpg"
		],
		"gaby lewis": [
			"https://www.espncricinfo.com/cricketers/gaby-lewis-774347",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/239100/239155.jpg"
		],
		"arlene kelly": [
			"https://www.espncricinfo.com/cricketers/arlene-kelly-592593",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353800/353893.4.jpg"
		],
		"amy hunter": [
			"https://www.espncricinfo.com/cricketers/amy-hunter-1229014",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334900/334989.2.jpg"
		],
		"graham hume": [
			"https://www.espncricinfo.com/cricketers/graham-hume-379144",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382121.1.jpg"
		],
		"fionn hand": [
			"https://www.espncricinfo.com/cricketers/fionn-hand-1099225",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348100/348137.4.jpg"
		],
		"george dockrell": [
			"https://www.espncricinfo.com/cricketers/george-dockrell-348034",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303900/303998.jpg"
		],
		"georgina dempsey": [
			"https://www.espncricinfo.com/cricketers/georgina-dempsey-1229017",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334900/334988.2.jpg"
		],
		"laura delany": [
			"https://www.espncricinfo.com/cricketers/laura-delany-418420",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354000/354075.1.png"
		],
		"gareth delany": [
			"https://www.espncricinfo.com/cricketers/gareth-delany-1099379",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306900/306932.1.jpg"
		],
		"alana dalzell": [
			"https://www.espncricinfo.com/cricketers/alana-dalzell-1229005",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"ava canning": [
			"https://www.espncricinfo.com/cricketers/ava-canning-1229015",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"curtis campher": [
			"https://www.espncricinfo.com/cricketers/curtis-campher-595921",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306900/306931.1.jpg"
		],
		"andy balbirnie": [
			"https://www.espncricinfo.com/cricketers/andy-balbirnie-303423",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382114.1.jpg"
		],
		"mark adair": [
			"https://www.espncricinfo.com/cricketers/mark-adair-526441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382119.1.jpg"
		],
		"ross adair": [
			"https://www.espncricinfo.com/cricketers/ross-adair-468573",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382100/382113.1.jpg"
		],
		"will young": [
			"https://www.espncricinfo.com/cricketers/will-young-547749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148100/148195.jpg"
		],
		"kane williamson": [
			"https://www.espncricinfo.com/cricketers/kane-williamson-277906",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303652.png"
		],
		"neil wagner": [
			"https://www.espncricinfo.com/cricketers/neil-wagner-233713",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303661.jpg"
		],
		"lea tahuhu": [
			"https://www.espncricinfo.com/cricketers/lea-tahuhu-380929",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305700/305782.png"
		],
		"tim southee": [
			"https://www.espncricinfo.com/cricketers/tim-southee-232364",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303610.png"
		],
		"ish sodhi": [
			"https://www.espncricinfo.com/cricketers/ish-sodhi-559066",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303602.jpg"
		],
		"tim seifert": [
			"https://www.espncricinfo.com/cricketers/tim-seifert-625964",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303816.png"
		],
		"ben sears": [
			"https://www.espncricinfo.com/cricketers/ben-sears-959769",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327800/327807.4.jpg"
		],
		"mitchell santner": [
			"https://www.espncricinfo.com/cricketers/mitchell-santner-502714",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356846.1.png"
		],
		"hannah rowe": [
			"https://www.espncricinfo.com/cricketers/hannah-rowe-543550",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334890.4.jpg"
		],
		"tim robinson": [
			"https://www.espncricinfo.com/cricketers/tim-robinson-1290929",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rachin ravindra": [
			"https://www.espncricinfo.com/cricketers/rachin-ravindra-959767",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271800/271809.jpg"
		],
		"georgia plimmer": [
			"https://www.espncricinfo.com/cricketers/georgia-plimmer-1208951",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353200/353269.4.jpg"
		],
		"glenn phillips": [
			"https://www.espncricinfo.com/cricketers/glenn-phillips-823509",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303500/303599.jpg"
		],
		"molly penfold": [
			"https://www.espncricinfo.com/cricketers/molly-penfold-1239671",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353957.4.jpg"
		],
		"ajaz patel": [
			"https://www.espncricinfo.com/cricketers/ajaz-patel-595783",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303500/303596.jpg"
		],
		"william o’rourke": [
			"https://www.espncricinfo.com/cricketers/william-o-rourke-1211825",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"henry nicholls": [
			"https://www.espncricinfo.com/cricketers/henry-nicholls-539511",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303600.jpg"
		],
		"james neesham": [
			"https://www.espncricinfo.com/cricketers/james-neesham-355269",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303603.jpg"
		],
		"daryl mitchell": [
			"https://www.espncricinfo.com/cricketers/daryl-mitchell-381743",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381800/381814.1.jpg"
		],
		"adam milne": [
			"https://www.espncricinfo.com/cricketers/adam-milne-450860",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303700/303779.png"
		],
		"cole mcconchie": [
			"https://www.espncricinfo.com/cricketers/cole-mcconchie-526021",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327800/327806.4.jpg"
		],
		"rosemary mair": [
			"https://www.espncricinfo.com/cricketers/rosemary-mair-701751",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334889.4.jpg"
		],
		"ben lister": [
			"https://www.espncricinfo.com/cricketers/ben-lister-1125536",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"tom latham": [
			"https://www.espncricinfo.com/cricketers/tom-latham-388802",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303601.jpg"
		],
		"scott kuggeleijn": [
			"https://www.espncricinfo.com/cricketers/scott-kuggeleijn-539548",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303811.png"
		],
		"jess kerr": [
			"https://www.espncricinfo.com/cricketers/jess-kerr-1068933",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305700/305774.4.jpg"
		],
		"amelia kerr": [
			"https://www.espncricinfo.com/cricketers/amelia-kerr-803971",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305700/305720.png"
		],
		"leigh kasperek": [
			"https://www.espncricinfo.com/cricketers/leigh-kasperek-306524",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/318900/318986.jpg"
		],
		"fran jonas": [
			"https://www.espncricinfo.com/cricketers/fran-jonas-1208952",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353200/353274.4.jpg"
		],
		"kyle jamieson": [
			"https://www.espncricinfo.com/cricketers/kyle-jamieson-625960",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303500/303584.jpg"
		],
		"matt henry": [
			"https://www.espncricinfo.com/cricketers/matt-henry-506612",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303607.jpg"
		],
		"brooke halliday": [
			"https://www.espncricinfo.com/cricketers/brooke-halliday-594654",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353959.4.jpg"
		],
		"mikaela greig": [
			"https://www.espncricinfo.com/cricketers/mikaela-greig-700557",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/177300/177391.1.jpg"
		],
		"maddy green": [
			"https://www.espncricinfo.com/cricketers/maddy-green-438265",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305700/305788.png"
		],
		"isabella gaze": [
			"https://www.espncricinfo.com/cricketers/isabella-gaze-1211545",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353200/353264.4.jpg"
		],
		"dean foxcroft": [
			"https://www.espncricinfo.com/cricketers/dean-foxcroft-596099",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/217600/217647.1.jpg"
		],
		"zakary foulkes": [
			"https://www.espncricinfo.com/cricketers/zakary-foulkes-1202098",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"lockie ferguson": [
			"https://www.espncricinfo.com/cricketers/lockie-ferguson-493773",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303800.png"
		],
		"jacob duffy": [
			"https://www.espncricinfo.com/cricketers/jacob-duffy-547766",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313900/313998.jpg"
		],
		"sophie devine": [
			"https://www.espncricinfo.com/cricketers/sophie-devine-231740",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305800/305803.png"
		],
		"devon conway": [
			"https://www.espncricinfo.com/cricketers/devon-conway-379140",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/318500/318588.1.jpg"
		],
		"dane cleaver": [
			"https://www.espncricinfo.com/cricketers/dane-cleaver-440517",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/112400/112496.1.jpg"
		],
		"josh clarkson": [
			"https://www.espncricinfo.com/cricketers/josh-clarkson-928015",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mark chapman": [
			"https://www.espncricinfo.com/cricketers/mark-chapman-438563",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303803.jpg"
		],
		"eden carson": [
			"https://www.espncricinfo.com/cricketers/eden-carson-1169661",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/341000/341049.4.jpg"
		],
		"michael bracewell": [
			"https://www.espncricinfo.com/cricketers/michael-bracewell-326968",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356810.1.png"
		],
		"chad bowes": [
			"https://www.espncricinfo.com/cricketers/chad-bowes-379890",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148400/148409.jpg"
		],
		"trent boult": [
			"https://www.espncricinfo.com/cricketers/trent-boult-277912",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303673.jpg"
		],
		"tom blundell": [
			"https://www.espncricinfo.com/cricketers/tom-blundell-440516",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303600/303672.jpg"
		],
		"bernadine bezuidenhout": [
			"https://www.espncricinfo.com/cricketers/bernadine-bezuidenhout-499247",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305700/305723.png"
		],
		"suzie bates": [
			"https://www.espncricinfo.com/cricketers/suzie-bates-54565",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305800/305804.png"
		],
		"adithya ashok": [
			"https://www.espncricinfo.com/cricketers/adithya-ashok-1193546",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/364600/364683.1.png"
		],
		"bella armstrong": [
			"https://www.espncricinfo.com/cricketers/bella-armstrong-966965",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"kate anderson": [
			"https://www.espncricinfo.com/cricketers/kate-anderson-598173",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"finn allen": [
			"https://www.espncricinfo.com/cricketers/finn-allen-959759",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271800/271806.jpg"
		],
		"zaman khan": [
			"https://www.espncricinfo.com/cricketers/zaman-khan-1272475",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"waheeda akhtar": [
			"https://www.espncricinfo.com/cricketers/waheeda-akhtar-941809",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"usman qadir": [
			"https://www.espncricinfo.com/cricketers/usman-qadir-348152",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/147000/147075.1.jpg"
		],
		"usman khan": [
			"https://www.espncricinfo.com/cricketers/usman-khan-1123428",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382035.2.jpg"
		],
		"usama mir": [
			"https://www.espncricinfo.com/cricketers/usama-mir-647667",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313621.png"
		],
		"umm-e-hani": [
			"https://www.espncricinfo.com/cricketers/umm-e-hani-1341174",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"tuba hassan": [
			"https://www.espncricinfo.com/cricketers/tuba-hassan-1204959",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352459.4.jpg"
		],
		"syeda aroob shah": [
			"https://www.espncricinfo.com/cricketers/syeda-aroob-shah-1204960",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304784.png"
		],
		"sufiyan muqeem": [
			"https://www.espncricinfo.com/cricketers/sufiyan-muqeem-1329697",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"sidra nawaz": [
			"https://www.espncricinfo.com/cricketers/sidra-nawaz-500733",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304783.png"
		],
		"sidra amin": [
			"https://www.espncricinfo.com/cricketers/sidra-amin-362356",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304782.png"
		],
		"shawaal zulfiqar": [
			"https://www.espncricinfo.com/cricketers/shawaal-zulfiqar-1352113",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"shan masood": [
			"https://www.espncricinfo.com/cricketers/shan-masood-233901",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302826.jpg"
		],
		"shaheen shah afridi": [
			"https://www.espncricinfo.com/cricketers/shaheen-shah-afridi-1072470",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382040.1.jpg"
		],
		"shadab khan": [
			"https://www.espncricinfo.com/cricketers/shadab-khan-922943",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302825.jpg"
		],
		"saud shakeel": [
			"https://www.espncricinfo.com/cricketers/saud-shakeel-652687",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313620.png"
		],
		"sarfaraz ahmed": [
			"https://www.espncricinfo.com/cricketers/sarfaraz-ahmed-227760",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302886.jpg"
		],
		"sajid khan": [
			"https://www.espncricinfo.com/cricketers/sajid-khan-1062812",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/325500/325569.3.jpg"
		],
		"saim ayub": [
			"https://www.espncricinfo.com/cricketers/saim-ayub-1161031",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382042.1.jpg"
		],
		"sahibzada farhan": [
			"https://www.espncricinfo.com/cricketers/sahibzada-farhan-647785",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302885.jpg"
		],
		"sadia iqbal": [
			"https://www.espncricinfo.com/cricketers/sadia-iqbal-1204917",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352460.4.jpg"
		],
		"sadaf shamas": [
			"https://www.espncricinfo.com/cricketers/sadaf-shamas-1315572",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352400/352464.4.jpg"
		],
		"rohail nazir": [
			"https://www.espncricinfo.com/cricketers/rohail-nazir-1092313",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rameen shamim": [
			"https://www.espncricinfo.com/cricketers/rameen-shamim-1144881",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"qasim akram": [
			"https://www.espncricinfo.com/cricketers/qasim-akram-1185475",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338300/338305.4.jpg"
		],
		"omair yousuf": [
			"https://www.espncricinfo.com/cricketers/omair-yousuf-1126059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/313600/313618.png"
		],
		"omaima sohail": [
			"https://www.espncricinfo.com/cricketers/omaima-sohail-941777",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282000/282076.1.jpg"
		],
		"noman ali": [
			"https://www.espncricinfo.com/cricketers/noman-ali-238672",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/325500/325566.3.jpg"
		],
		"nida dar": [
			"https://www.espncricinfo.com/cricketers/nida-dar-333355",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304777.png"
		],
		"natalia pervaiz": [
			"https://www.espncricinfo.com/cricketers/natalia-pervaiz-1125059",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304776.png"
		],
		"nashra sandhu": [
			"https://www.espncricinfo.com/cricketers/nashra-sandhu-941803",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304775.png"
		],
		"naseem shah": [
			"https://www.espncricinfo.com/cricketers/naseem-shah-1158088",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382045.1.jpg"
		],
		"najiha alvi": [
			"https://www.espncricinfo.com/cricketers/najiha-alvi-1204957",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"muneeba ali": [
			"https://www.espncricinfo.com/cricketers/muneeba-ali-941795",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304773.png"
		],
		"mubasir khan": [
			"https://www.espncricinfo.com/cricketers/mubasir-khan-1217487",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mohammad wasim": [
			"https://www.espncricinfo.com/cricketers/mohammad-wasim-1185538",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327000/327012.4.jpg"
		],
		"mohammad rizwan": [
			"https://www.espncricinfo.com/cricketers/mohammad-rizwan-323389",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382034.2.jpg"
		],
		"mohammad nawaz": [
			"https://www.espncricinfo.com/cricketers/mohammad-nawaz-348148",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/236800/236859.jpg"
		],
		"mohammad haris": [
			"https://www.espncricinfo.com/cricketers/mohammad-haris-1205559",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mohammad amir": [
			"https://www.espncricinfo.com/cricketers/mohammad-amir-290948",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382041.1.jpg"
		],
		"mirza baig": [
			"https://www.espncricinfo.com/cricketers/mirza-baig-1331512",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mir hamza": [
			"https://www.espncricinfo.com/cricketers/mir-hamza-556684",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/147000/147083.1.jpg"
		],
		"khushdil shah": [
			"https://www.espncricinfo.com/cricketers/khushdil-shah-716733",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302876.jpg"
		],
		"khurram shahzad": [
			"https://www.espncricinfo.com/cricketers/khurram-shahzad-1159495",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"irfan khan": [
			"https://www.espncricinfo.com/cricketers/irfan-khan-1199426",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"iram javed": [
			"https://www.espncricinfo.com/cricketers/iram-javed-572633",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304769.png"
		],
		"imam-ul-haq": [
			"https://www.espncricinfo.com/cricketers/imam-ul-haq-568276",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302817.jpg"
		],
		"imad wasim": [
			"https://www.espncricinfo.com/cricketers/imad-wasim-227758",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382037.1.jpg"
		],
		"iftikhar ahmed": [
			"https://www.espncricinfo.com/cricketers/iftikhar-ahmed-480603",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382033.2.jpg"
		],
		"haseebullah khan": [
			"https://www.espncricinfo.com/cricketers/haseebullah-khan-1171127",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"hasan ali": [
			"https://www.espncricinfo.com/cricketers/hasan-ali-681305",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302700/302774.jpg"
		],
		"haris rauf": [
			"https://www.espncricinfo.com/cricketers/haris-rauf-1161606",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312100/312183.png"
		],
		"haider ali": [
			"https://www.espncricinfo.com/cricketers/haider-ali-1168651",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307900/307944.1.jpg"
		],
		"gull feroza": [
			"https://www.espncricinfo.com/cricketers/gull-feroza-1144870",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"ghulam fatima": [
			"https://www.espncricinfo.com/cricketers/ghulam-fatima-1080011",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334897.4.jpg"
		],
		"fatima sana": [
			"https://www.espncricinfo.com/cricketers/fatima-sana-1144886",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334896.4.jpg"
		],
		"fakhar zaman": [
			"https://www.espncricinfo.com/cricketers/fakhar-zaman-512191",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382031.1.jpg"
		],
		"faheem ashraf": [
			"https://www.espncricinfo.com/cricketers/faheem-ashraf-681117",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302700/302770.jpg"
		],
		"diana baig": [
			"https://www.espncricinfo.com/cricketers/diana-baig-572638",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304761.png"
		],
		"bismah maroof": [
			"https://www.espncricinfo.com/cricketers/bismah-maroof-260229",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/150000/150085.1.jpg"
		],
		"babar azam": [
			"https://www.espncricinfo.com/cricketers/babar-azam-348144",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382030.1.jpg"
		],
		"azam khan": [
			"https://www.espncricinfo.com/cricketers/azam-khan-1137262",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382044.1.jpg"
		],
		"ayesha zafar": [
			"https://www.espncricinfo.com/cricketers/ayesha-zafar-915489",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304760.png"
		],
		"asif ali": [
			"https://www.espncricinfo.com/cricketers/asif-ali-494230",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327000/327013.4.jpg"
		],
		"arshad iqbal": [
			"https://www.espncricinfo.com/cricketers/arshad-iqbal-1130463",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324717.4.jpg"
		],
		"arafat minhas": [
			"https://www.espncricinfo.com/cricketers/arafat-minhas-1332783",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"aliya riaz": [
			"https://www.espncricinfo.com/cricketers/aliya-riaz-572645",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304700/304757.png"
		],
		"agha salman": [
			"https://www.espncricinfo.com/cricketers/agha-salman-623977",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/192500/192557.1.jpg"
		],
		"abrar ahmed": [
			"https://www.espncricinfo.com/cricketers/abrar-ahmed-734459",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/376900/376943.4.jpg"
		],
		"abdullah shafique": [
			"https://www.espncricinfo.com/cricketers/abdullah-shafique-922941",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/364700/364776.4.jpg"
		],
		"abbas afridi": [
			"https://www.espncricinfo.com/cricketers/abbas-afridi-1158538",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/382000/382038.1.jpg"
		],
		"aamer jamal": [
			"https://www.espncricinfo.com/cricketers/aamer-jamal-793441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/373600/373684.1.png"
		],
		"zubayr hamza": [
			"https://www.espncricinfo.com/cricketers/zubayr-hamza-550187",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/297500/297553.1.jpg"
		],
		"laura wolvaardt": [
			"https://www.espncricinfo.com/cricketers/laura-wolvaardt-922481",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307313.jpg"
		],
		"lizaad williams": [
			"https://www.espncricinfo.com/cricketers/lizaad-williams-379887",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/329300/329354.4.jpg"
		],
		"shaun von berg": [
			"https://www.espncricinfo.com/cricketers/shaun-von-berg-393289",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"kyle verreynne": [
			"https://www.espncricinfo.com/cricketers/kyle-verreynne-595004",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317952.jpg"
		],
		"raynard van tonder": [
			"https://www.espncricinfo.com/cricketers/raynard-van-tonder-595380",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271900/271928.jpg"
		],
		"rassie van der dussen": [
			"https://www.espncricinfo.com/cricketers/rassie-van-der-dussen-337790",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317946.jpg"
		],
		"delmi tucker": [
			"https://www.espncricinfo.com/cricketers/delmi-tucker-939253",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353956.4.jpg"
		],
		"chloe tryon": [
			"https://www.espncricinfo.com/cricketers/chloe-tryon-453370",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307200/307247.png"
		],
		"tristan stubbs": [
			"https://www.espncricinfo.com/cricketers/tristan-stubbs-595978",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345900/345940.4.jpg"
		],
		"nondumiso shangase": [
			"https://www.espncricinfo.com/cricketers/nondumiso-shangase-941933",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307325.png"
		],
		"tabraiz shamsi": [
			"https://www.espncricinfo.com/cricketers/tabraiz-shamsi-379145",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317943.jpg"
		],
		"tumi sekhukhune": [
			"https://www.espncricinfo.com/cricketers/tumi-sekhukhune-939229",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307338.png"
		],
		"ryan rickelton": [
			"https://www.espncricinfo.com/cricketers/ryan-rickelton-605661",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345900/345935.4.jpg"
		],
		"kagiso rabada": [
			"https://www.espncricinfo.com/cricketers/kagiso-rabada-550215",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317954.jpg"
		],
		"dane piedt": [
			"https://www.espncricinfo.com/cricketers/dane-piedt-379926",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/297300/297369.1.jpg"
		],
		"andile phehlukwayo": [
			"https://www.espncricinfo.com/cricketers/andile-phehlukwayo-540316",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317969.jpg"
		],
		"keegan petersen": [
			"https://www.espncricinfo.com/cricketers/keegan-petersen-485676",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324708.1.jpg"
		],
		"nqabayomzi peter": [
			"https://www.espncricinfo.com/cricketers/nqabayomzi-peter-946483",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"dane paterson": [
			"https://www.espncricinfo.com/cricketers/dane-paterson-327947",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/297300/297366.1.jpg"
		],
		"duanne olivier": [
			"https://www.espncricinfo.com/cricketers/duanne-olivier-486679",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316100/316172.jpg"
		],
		"anrich nortje": [
			"https://www.espncricinfo.com/cricketers/anrich-nortje-481979",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317968.jpg"
		],
		"lungi ngidi": [
			"https://www.espncricinfo.com/cricketers/lungi-ngidi-542023",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317951.jpg"
		],
		"wiaan mulder": [
			"https://www.espncricinfo.com/cricketers/wiaan-mulder-698189",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317942.jpg"
		],
		"tshepo moreki": [
			"https://www.espncricinfo.com/cricketers/tshepo-moreki-594235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/258600/258609.jpg"
		],
		"edward moore": [
			"https://www.espncricinfo.com/cricketers/edward-moore-481975",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/236300/236329.1.jpg"
		],
		"nonkululeko mlaba": [
			"https://www.espncricinfo.com/cricketers/nonkululeko-mlaba-971203",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300617.4.jpg"
		],
		"david miller": [
			"https://www.espncricinfo.com/cricketers/david-miller-321777",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317964.jpg"
		],
		"karabo meso": [
			"https://www.espncricinfo.com/cricketers/karabo-meso-1340108",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"eliz-mari marx": [
			"https://www.espncricinfo.com/cricketers/eliz-mari-marx-1137543",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"aiden markram": [
			"https://www.espncricinfo.com/cricketers/aiden-markram-600498",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317970.jpg"
		],
		"keshav maharaj": [
			"https://www.espncricinfo.com/cricketers/keshav-maharaj-267724",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317953.jpg"
		],
		"sisanda magala": [
			"https://www.espncricinfo.com/cricketers/sisanda-magala-379776",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324707.1.jpg"
		],
		"sune luus": [
			"https://www.espncricinfo.com/cricketers/sune-luus-487007",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307332.png"
		],
		"patrick kruger": [
			"https://www.espncricinfo.com/cricketers/patrick-kruger-499560",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"heinrich klaasen": [
			"https://www.espncricinfo.com/cricketers/heinrich-klaasen-436757",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317958.jpg"
		],
		"masabata klaas": [
			"https://www.espncricinfo.com/cricketers/masabata-klaas-364368",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307320.png"
		],
		"ayabonga khaka": [
			"https://www.espncricinfo.com/cricketers/ayabonga-khaka-387261",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307200/307245.png"
		],
		"marizanne kapp": [
			"https://www.espncricinfo.com/cricketers/marizanne-kapp-351836",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307319.png"
		],
		"marco jansen": [
			"https://www.espncricinfo.com/cricketers/marco-jansen-696401",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335000/335050.4.jpg"
		],
		"sinalo jafta": [
			"https://www.espncricinfo.com/cricketers/sinalo-jafta-499254",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335600/335650.4.jpg"
		],
		"ayanda hlubi": [
			"https://www.espncricinfo.com/cricketers/ayanda-hlubi-1208961",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"reeza hendricks": [
			"https://www.espncricinfo.com/cricketers/reeza-hendricks-269280",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317945.jpg"
		],
		"beuran hendricks": [
			"https://www.espncricinfo.com/cricketers/beuran-hendricks-379927",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317967.jpg"
		],
		"lara goodall": [
			"https://www.espncricinfo.com/cricketers/lara-goodall-593936",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335600/335649.4.jpg"
		],
		"clyde fortuin": [
			"https://www.espncricinfo.com/cricketers/clyde-fortuin-596137",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179800/179811.1.jpg"
		],
		"bjorn fortuin": [
			"https://www.espncricinfo.com/cricketers/bjorn-fortuin-553249",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317966.jpg"
		],
		"donovan ferreira": [
			"https://www.espncricinfo.com/cricketers/donovan-ferreira-698315",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356889.1.png"
		],
		"dean elgar": [
			"https://www.espncricinfo.com/cricketers/dean-elgar-230852",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317963.jpg"
		],
		"annerie dercksen": [
			"https://www.espncricinfo.com/cricketers/annerie-dercksen-1163087",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353955.4.jpg"
		],
		"tony de zorzi": [
			"https://www.espncricinfo.com/cricketers/tony-de-zorzi-697183",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/217600/217635.1.jpg"
		],
		"ruan de swardt": [
			"https://www.espncricinfo.com/cricketers/ruan-de-swardt-698321",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"meike de ridder": [
			"https://www.espncricinfo.com/cricketers/meike-de-ridder-499268",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"quinton de kock": [
			"https://www.espncricinfo.com/cricketers/quinton-de-kock-379143",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317947.jpg"
		],
		"nadine de klerk": [
			"https://www.espncricinfo.com/cricketers/nadine-de-klerk-939249",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307300/307323.png"
		],
		"gerald coetzee": [
			"https://www.espncricinfo.com/cricketers/gerald-coetzee-596010",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"nandre burger": [
			"https://www.espncricinfo.com/cricketers/nandre-burger-971349",
			"https://wassets.hscicdn.com/static/images/lazyimage-dark-noaspect.svg"
		],
		"tazmin brits": [
			"https://www.espncricinfo.com/cricketers/tazmin-brits-600731",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335600/335652.4.jpg"
		],
		"dewald brevis": [
			"https://www.espncricinfo.com/cricketers/dewald-brevis-1070665",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/333900/333935.4.jpg"
		],
		"matthew breetzke": [
			"https://www.espncricinfo.com/cricketers/matthew-breetzke-595267",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/271900/271924.jpg"
		],
		"neil brand": [
			"https://www.espncricinfo.com/cricketers/neil-brand-742489",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"anneke bosch": [
			"https://www.espncricinfo.com/cricketers/anneke-bosch-482506",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353952.4.jpg"
		],
		"david bedingham": [
			"https://www.espncricinfo.com/cricketers/david-bedingham-498585",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/297400/297405.1.jpg"
		],
		"temba bavuma": [
			"https://www.espncricinfo.com/cricketers/temba-bavuma-372116",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317900/317941.jpg"
		],
		"ottneil baartman": [
			"https://www.espncricinfo.com/cricketers/ottneil-baartman-535353",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381700/381731.1.jpg"
		],
		"dunith wellalage": [
			"https://www.espncricinfo.com/cricketers/dunith-wellalage-1152427",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350100/350118.4.jpg"
		],
		"prasadani weerakkody": [
			"https://www.espncricinfo.com/cricketers/prasadani-weerakkody-442310",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/150000/150098.1.jpg"
		],
		"vijayakanth viyaskanth": [
			"https://www.espncricinfo.com/cricketers/vijayakanth-viyaskanth-1153149",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"nimesh vimukthi": [
			"https://www.espncricinfo.com/cricketers/nimesh-vimukthi-1070154",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/318500/318598.jpg"
		],
		"jeffrey vandersay": [
			"https://www.espncricinfo.com/cricketers/jeffrey-vandersay-370040",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305178.jpg"
		],
		"nuwan thushara": [
			"https://www.espncricinfo.com/cricketers/nuwan-thushara-955235",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/381300/381395.4.jpg"
		],
		"maheesh theekshana": [
			"https://www.espncricinfo.com/cricketers/maheesh-theekshana-1138316",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/336200/336296.4.jpg"
		],
		"nilakshika silva": [
			"https://www.espncricinfo.com/cricketers/nilakshika-silva-557764",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306500/306567.jpg"
		],
		"dasun shanaka": [
			"https://www.espncricinfo.com/cricketers/dasun-shanaka-437316",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/327900/327999.7.jpg"
		],
		"anushka sanjeewani": [
			"https://www.espncricinfo.com/cricketers/anushka-sanjeewani-493860",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300650.1.jpg"
		],
		"sadeera samarawickrama": [
			"https://www.espncricinfo.com/cricketers/sadeera-samarawickrama-629076",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303845.png"
		],
		"lahiru samarakoon": [
			"https://www.espncricinfo.com/cricketers/lahiru-samarakoon-924551",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/311700/311704.jpg"
		],
		"inoka ranaweera": [
			"https://www.espncricinfo.com/cricketers/inoka-ranaweera-434844",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/150100/150101.1.jpg"
		],
		"oshadi ranasinghe": [
			"https://www.espncricinfo.com/cricketers/oshadi-ranasinghe-429180",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/153800/153890.1.jpg"
		],
		"kasun rajitha": [
			"https://www.espncricinfo.com/cricketers/kasun-rajitha-499594",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303833.png"
		],
		"pramod madushan": [
			"https://www.espncricinfo.com/cricketers/pramod-madushan-826689",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348600/348611.4.jpg"
		],
		"udeshika prabodhani": [
			"https://www.espncricinfo.com/cricketers/udeshika-prabodhani-335236",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302847.jpg"
		],
		"kusal perera": [
			"https://www.espncricinfo.com/cricketers/kusal-perera-300631",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/263600/263669.1.png"
		],
		"hasini perera": [
			"https://www.espncricinfo.com/cricketers/hasini-perera-371185",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302856.jpg"
		],
		"matheesha pathirana": [
			"https://www.espncricinfo.com/cricketers/matheesha-pathirana-1194795",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350000/350094.4.jpg"
		],
		"pathum nissanka": [
			"https://www.espncricinfo.com/cricketers/pathum-nissanka-1028655",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/318400/318435.jpg"
		],
		"ramesh mendis": [
			"https://www.espncricinfo.com/cricketers/ramesh-mendis-629084",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179500/179523.1.jpg"
		],
		"kamindu mendis": [
			"https://www.espncricinfo.com/cricketers/kamindu-mendis-784373",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305194.jpg"
		],
		"kusal mendis": [
			"https://www.espncricinfo.com/cricketers/kusal-mendis-629074",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303835.png"
		],
		"angelo mathews": [
			"https://www.espncricinfo.com/cricketers/angelo-mathews-49764",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/304200/304293.png"
		],
		"dilshan madushanka": [
			"https://www.espncricinfo.com/cricketers/dilshan-madushanka-793007",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348100/348129.4.jpg"
		],
		"harshitha samarawickrama": [
			"https://www.espncricinfo.com/cricketers/harshitha-samarawickrama-557839",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300648.1.jpg"
		],
		"janith liyanage": [
			"https://www.espncricinfo.com/cricketers/janith-liyanage-681681",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334700/334796.png"
		],
		"sugandika kumari": [
			"https://www.espncricinfo.com/cricketers/sugandika-kumari-631609",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302889.jpg"
		],
		"lahiru kumara": [
			"https://www.espncricinfo.com/cricketers/lahiru-kumara-784375",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303837.png"
		],
		"achini kulasuriya": [
			"https://www.espncricinfo.com/cricketers/achini-kulasuriya-557731",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302855.jpg"
		],
		"kawya kavindi": [
			"https://www.espncricinfo.com/cricketers/kawya-kavindi-1371878",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"hansima karunaratne": [
			"https://www.espncricinfo.com/cricketers/hansima-karunaratne-631722",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300600/300645.1.jpg"
		],
		"dimuth karunaratne": [
			"https://www.espncricinfo.com/cricketers/dimuth-karunaratne-227772",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/358800/358835.3.jpg"
		],
		"chamika karunaratne": [
			"https://www.espncricinfo.com/cricketers/chamika-karunaratne-623695",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303830.png"
		],
		"prabath jayasuriya": [
			"https://www.espncricinfo.com/cricketers/prabath-jayasuriya-422871",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/301800/301831.jpg"
		],
		"lahiru udara": [
			"https://www.espncricinfo.com/cricketers/lahiru-udara-704693",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315800/315893.jpg"
		],
		"dushan hemantha": [
			"https://www.espncricinfo.com/cricketers/dushan-hemantha-721041",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334819.gif"
		],
		"wanindu hasaranga": [
			"https://www.espncricinfo.com/cricketers/wanindu-hasaranga-784379",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/294200/294296.jpg"
		],
		"chamika gunasekara": [
			"https://www.espncricinfo.com/cricketers/chamika-gunasekara-1210293",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/371100/371195.png"
		],
		"vishmi gunaratne": [
			"https://www.espncricinfo.com/cricketers/vishmi-gunaratne-1290105",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/331500/331555.4.jpg"
		],
		"shashini gimhani": [
			"https://www.espncricinfo.com/cricketers/shashini-gimhani-1427037",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380500/380558.png"
		],
		"avishka fernando": [
			"https://www.espncricinfo.com/cricketers/avishka-fernando-784369",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/289600/289652.1.jpg"
		],
		"inoshi priyadharshani": [
			"https://www.espncricinfo.com/cricketers/inoshi-priyadharshani-371194",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/282200/282272.1.jpg"
		],
		"ravindu fernando": [
			"https://www.espncricinfo.com/cricketers/ravindu-fernando-1217156",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/372100/372166.png"
		],
		"vishwa fernando": [
			"https://www.espncricinfo.com/cricketers/vishwa-fernando-465783",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303847.png"
		],
		"nuwanidu fernando": [
			"https://www.espncricinfo.com/cricketers/nuwanidu-fernando-1074333",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/344800/344821.gif"
		],
		"nishan madushka": [
			"https://www.espncricinfo.com/cricketers/nishan-madushka-1126045",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/344800/344819.gif"
		],
		"binura fernando": [
			"https://www.espncricinfo.com/cricketers/binura-fernando-629080",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/317600/317696.jpg"
		],
		"asitha fernando": [
			"https://www.espncricinfo.com/cricketers/asitha-fernando-786925",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/315800/315892.jpg"
		],
		"imesha dulani": [
			"https://www.espncricinfo.com/cricketers/imesha-dulani-924291",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/331500/331554.4.jpg"
		],
		"kavisha dilhari": [
			"https://www.espncricinfo.com/cricketers/kavisha-dilhari-923703",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302878.jpg"
		],
		"dhananjaya de silva": [
			"https://www.espncricinfo.com/cricketers/dhananjaya-de-silva-465793",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/303800/303832.png"
		],
		"shevon daniel": [
			"https://www.espncricinfo.com/cricketers/shevon-daniel-1194744",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350100/350121.4.jpg"
		],
		"akila dananjaya": [
			"https://www.espncricinfo.com/cricketers/akila-dananjaya-574178",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348800/348839.gif"
		],
		"lasith croospulle": [
			"https://www.espncricinfo.com/cricketers/lasith-croospulle-1027867",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/343900/343957.gif"
		],
		"dinesh chandimal": [
			"https://www.espncricinfo.com/cricketers/dinesh-chandimal-300628",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/325600/325673.5.jpg"
		],
		"dushmantha chameera": [
			"https://www.espncricinfo.com/cricketers/dushmantha-chameera-552152",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305100/305114.jpg"
		],
		"ashen bandara": [
			"https://www.espncricinfo.com/cricketers/ashen-bandara-958691",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/323000/323079.png"
		],
		"chamari athapaththu": [
			"https://www.espncricinfo.com/cricketers/chamari-athapaththu-318853",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302800/302875.jpg"
		],
		"charith asalanka": [
			"https://www.espncricinfo.com/cricketers/charith-asalanka-784367",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348100/348128.4.jpg"
		],
		"sahan arachchige": [
			"https://www.espncricinfo.com/cricketers/sahan-arachchige-693975",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300700/300767.jpg"
		],
		"zaida james": [
			"https://www.espncricinfo.com/cricketers/zaida-james-1268281",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353926.4.jpg"
		],
		"kate wilmott": [
			"https://www.espncricinfo.com/cricketers/kate-wilmott-492674",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"rashada williams": [
			"https://www.espncricinfo.com/cricketers/rashada-williams-769427",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/335600/335648.4.jpg"
		],
		"jomel warrican": [
			"https://www.espncricinfo.com/cricketers/jomel-warrican-432214",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316000/316080.png"
		],
		"hayden walsh": [
			"https://www.espncricinfo.com/cricketers/hayden-walsh-443263",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/286800/286881.1.jpg"
		],
		"oshane thomas": [
			"https://www.espncricinfo.com/cricketers/oshane-thomas-914567",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/307600/307607.jpg"
		],
		"stafanie taylor": [
			"https://www.espncricinfo.com/cricketers/stafanie-taylor-355359",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306628.png"
		],
		"odean smith": [
			"https://www.espncricinfo.com/cricketers/odean-smith-820691",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348100/348147.4.jpg"
		],
		"kevin sinclair": [
			"https://www.espncricinfo.com/cricketers/kevin-sinclair-1206110",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/322000/322017.png"
		],
		"romario shepherd": [
			"https://www.espncricinfo.com/cricketers/romario-shepherd-677077",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/322000/322037.png"
		],
		"jayden seales": [
			"https://www.espncricinfo.com/cricketers/jayden-seales-1199304",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/312200/312278.1.jpg"
		],
		"sherfane rutherford": [
			"https://www.espncricinfo.com/cricketers/sherfane-rutherford-914541",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/380600/380673.4.jpg"
		],
		"andre russell": [
			"https://www.espncricinfo.com/cricketers/andre-russell-276298",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/308900/308972.png"
		],
		"kemar roach": [
			"https://www.espncricinfo.com/cricketers/kemar-roach-230553",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305913.1.jpg"
		],
		"raymon reifer": [
			"https://www.espncricinfo.com/cricketers/raymon-reifer-450101",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305914.1.jpg"
		],
		"karishma ramharack": [
			"https://www.espncricinfo.com/cricketers/karishma-ramharack-769517",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/334800/334887.4.jpg"
		],
		"rovman powell": [
			"https://www.espncricinfo.com/cricketers/rovman-powell-820351",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/246200/246267.1.jpg"
		],
		"nicholas pooran": [
			"https://www.espncricinfo.com/cricketers/nicholas-pooran-604302",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/302200/302286.jpg"
		],
		"keemo paul": [
			"https://www.espncricinfo.com/cricketers/keemo-paul-677081",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352300/352355.4.jpg"
		],
		"kjorn ottley": [
			"https://www.espncricinfo.com/cricketers/kjorn-ottley-416190",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/232700/232757.jpg"
		],
		"chedean nation": [
			"https://www.espncricinfo.com/cricketers/chedean-nation-355355",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306616.png"
		],
		"ashmini munisar": [
			"https://www.espncricinfo.com/cricketers/ashmini-munisar-1352168",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/370900/370962.4.jpg"
		],
		"gudakesh motie": [
			"https://www.espncricinfo.com/cricketers/gudakesh-motie-670045",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/326100/326128.4.jpg"
		],
		"kirk mckenzie": [
			"https://www.espncricinfo.com/cricketers/kirk-mckenzie-1209196",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/326100/326135.4.jpg"
		],
		"obed mccoy": [
			"https://www.espncricinfo.com/cricketers/obed-mccoy-906783",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/322000/322031.png"
		],
		"kyle mayers": [
			"https://www.espncricinfo.com/cricketers/kyle-mayers-348056",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316000/316081.png"
		],
		"hayley matthews": [
			"https://www.espncricinfo.com/cricketers/hayley-matthews-474308",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306637.jpg"
		],
		"brandon king": [
			"https://www.espncricinfo.com/cricketers/brandon-king-670035",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/232700/232775.jpg"
		],
		"shamar joseph": [
			"https://www.espncricinfo.com/cricketers/shamar-joseph-1356971",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/373700/373784.1.png"
		],
		"qiana joseph": [
			"https://www.espncricinfo.com/cricketers/qiana-joseph-769485",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/370900/370952.4.jpg"
		],
		"djenaba joseph": [
			"https://www.espncricinfo.com/cricketers/djenaba-joseph-1349230",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/353900/353927.4.jpg"
		],
		"alzarri joseph": [
			"https://www.espncricinfo.com/cricketers/alzarri-joseph-670031",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/321900/321943.png"
		],
		"akeal hosein": [
			"https://www.espncricinfo.com/cricketers/akeal-hosein-530812",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/326100/326139.4.jpg"
		],
		"shai hope": [
			"https://www.espncricinfo.com/cricketers/shai-hope-581379",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305915.1.jpg"
		],
		"jason holder": [
			"https://www.espncricinfo.com/cricketers/jason-holder-391485",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/214700/214757.1.jpg"
		],
		"kavem hodge": [
			"https://www.espncricinfo.com/cricketers/kavem-hodge-348091",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/136300/136337.1.jpg"
		],
		"shimron hetmyer": [
			"https://www.espncricinfo.com/cricketers/shimron-hetmyer-670025",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/356800/356802.1.png"
		],
		"chinelle henry": [
			"https://www.espncricinfo.com/cricketers/chinelle-henry-474190",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306619.png"
		],
		"justin greaves": [
			"https://www.espncricinfo.com/cricketers/justin-greaves-510823",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/232800/232805.jpg"
		],
		"jannillea glasgow": [
			"https://www.espncricinfo.com/cricketers/jannillea-glasgow-1268602",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/370900/370955.4.jpg"
		],
		"shabika gajnabi": [
			"https://www.espncricinfo.com/cricketers/shabika-gajnabi-1199630",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/311900/311991.16.jpg"
		],
		"shannon gabriel": [
			"https://www.espncricinfo.com/cricketers/shannon-gabriel-446101",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/145100/145199.1.jpg"
		],
		"cherry-ann fraser": [
			"https://www.espncricinfo.com/cricketers/cherry-ann-fraser-1214080",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306618.png"
		],
		"matthew forde": [
			"https://www.espncricinfo.com/cricketers/matthew-forde-1209190",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"afy fletcher": [
			"https://www.espncricinfo.com/cricketers/afy-fletcher-355351",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306100/306129.png"
		],
		"andre fletcher": [
			"https://www.espncricinfo.com/cricketers/andre-fletcher-51862",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/238300/238341.jpg"
		],
		"dominic drakes": [
			"https://www.espncricinfo.com/cricketers/dominic-drakes-906749",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/352300/352354.4.jpg"
		],
		"joshua da silva": [
			"https://www.espncricinfo.com/cricketers/joshua-da-silva-1168667",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316100/316113.png"
		],
		"rahkeem cornwall": [
			"https://www.espncricinfo.com/cricketers/rahkeem-cornwall-494581",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/316100/316114.png"
		],
		"shamilia connell": [
			"https://www.espncricinfo.com/cricketers/shamilia-connell-474191",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306700/306700.png"
		],
		"roston chase": [
			"https://www.espncricinfo.com/cricketers/roston-chase-391832",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305909.1.jpg"
		],
		"johnson charles": [
			"https://www.espncricinfo.com/cricketers/johnson-charles-333066",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/144900/144991.1.jpg"
		],
		"tagenarine chanderpaul": [
			"https://www.espncricinfo.com/cricketers/tagenarine-chanderpaul-601968",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/350300/350328.4.jpg"
		],
		"keacy carty": [
			"https://www.espncricinfo.com/cricketers/keacy-carty-820677",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/203600/203699.1.jpg"
		],
		"yannic cariah": [
			"https://www.espncricinfo.com/cricketers/yannic-cariah-431902",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/348100/348145.4.jpg"
		],
		"shemaine campbelle": [
			"https://www.espncricinfo.com/cricketers/shemaine-campbelle-424631",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306600/306631.png"
		],
		"shamarh brooks": [
			"https://www.espncricinfo.com/cricketers/shamarh-brooks-230555",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305918.1.jpg"
		],
		"kraigg brathwaite": [
			"https://www.espncricinfo.com/cricketers/kraigg-brathwaite-348024",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305917.1.jpg"
		],
		"jermaine blackwood": [
			"https://www.espncricinfo.com/cricketers/jermaine-blackwood-431909",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/305900/305910.1.jpg"
		],
		"teddy bishop": [
			"https://www.espncricinfo.com/cricketers/teddy-bishop-1275935",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/339100/339178.4.jpg"
		],
		"alick athanaze": [
			"https://www.espncricinfo.com/cricketers/alick-athanaze-1078692",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/364900/364944.4.jpg"
		],
		"aaliyah alleyne": [
			"https://www.espncricinfo.com/cricketers/aaliyah-alleyne-661441",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/306100/306128.png"
		],
		"fabian allen": [
			"https://www.espncricinfo.com/cricketers/fabian-allen-670013",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/300700/300765.1.jpg"
		],
		"sean williams": [
			"https://www.espncricinfo.com/cricketers/sean-williams-55870",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/235600/235675.1.jpg"
		],
		"nick welch": [
			"https://www.espncricinfo.com/cricketers/nick-welch-696145",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"loreen tshuma": [
			"https://www.espncricinfo.com/cricketers/loreen-tshuma-538593",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332600/332605.3.jpg"
		],
		"sikandar raza": [
			"https://www.espncricinfo.com/cricketers/sikandar-raza-299572",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/181300/181305.1.jpg"
		],
		"nomvelo sibanda": [
			"https://www.espncricinfo.com/cricketers/nomvelo-sibanda-1080012",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332600/332606.3.jpg"
		],
		"milton shumba": [
			"https://www.espncricinfo.com/cricketers/milton-shumba-951781",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354000/354052.1.png"
		],
		"loryn phiri": [
			"https://www.espncricinfo.com/cricketers/loryn-phiri-1135025",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"josephine nkomo": [
			"https://www.espncricinfo.com/cricketers/josephine-nkomo-638256",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332500/332598.3.jpg"
		],
		"richard ngarava": [
			"https://www.espncricinfo.com/cricketers/richard-ngarava-806241",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345220.4.jpg"
		],
		"ainsley ndlovu": [
			"https://www.espncricinfo.com/cricketers/ainsley-ndlovu-596456",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"ashley ndiraya": [
			"https://www.espncricinfo.com/cricketers/ashley-ndiraya-490956",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332600/332603.3.jpg"
		],
		"kelis ndhlovu": [
			"https://www.espncricinfo.com/cricketers/kelis-ndhlovu-1250707",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"blessing muzarabani": [
			"https://www.espncricinfo.com/cricketers/blessing-muzarabani-827051",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/321400/321471.png"
		],
		"christine mutasa": [
			"https://www.espncricinfo.com/cricketers/christine-mutasa-1306917",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"mary-anne musonda": [
			"https://www.espncricinfo.com/cricketers/mary-anne-musonda-501348",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332500/332597.3.jpg"
		],
		"modester mupachikwa": [
			"https://www.espncricinfo.com/cricketers/modester-mupachikwa-538591",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332500/332599.3.jpg"
		],
		"tony munyonga": [
			"https://www.espncricinfo.com/cricketers/tony-munyonga-1122853",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345224.4.jpg"
		],
		"carl mumba": [
			"https://www.espncricinfo.com/cricketers/carl-mumba-672775",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324712.4.jpg"
		],
		"pellagia mujaji": [
			"https://www.espncricinfo.com/cricketers/pellagia-mujaji-272026",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/227600/227657.1.jpg"
		],
		"chipo mugeri-tiripano": [
			"https://www.espncricinfo.com/cricketers/chipo-mugeri-tiripano-317148",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/227600/227603.1.jpg"
		],
		"tapiwa mufudza": [
			"https://www.espncricinfo.com/cricketers/tapiwa-mufudza-453321",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/235900/235911.1.jpg"
		],
		"audrey mazvishaya": [
			"https://www.espncricinfo.com/cricketers/audrey-mazvishaya-538592",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/227500/227599.1.jpg"
		],
		"sharne mayers": [
			"https://www.espncricinfo.com/cricketers/sharne-mayers-317144",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332600/332601.3.jpg"
		],
		"nyasha mayavo": [
			"https://www.espncricinfo.com/cricketers/nyasha-mayavo-493753",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148300/148313.jpg"
		],
		"brandon mavuta": [
			"https://www.espncricinfo.com/cricketers/brandon-mavuta-806239",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/354000/354051.1.png"
		],
		"michelle mavunga": [
			"https://www.espncricinfo.com/cricketers/michelle-mavunga-1273947",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"wellington masakadza": [
			"https://www.espncricinfo.com/cricketers/wellington-masakadza-571703",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/148300/148312.jpg"
		],
		"tadiwanashe marumani": [
			"https://www.espncricinfo.com/cricketers/tadiwanashe-marumani-946507",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345221.4.jpg"
		],
		"precious marange": [
			"https://www.espncricinfo.com/cricketers/precious-marange-317139",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/332600/332600.3.jpg"
		],
		"wessly madhevere": [
			"https://www.espncricinfo.com/cricketers/wessly-madhevere-938959",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/324700/324710.4.jpg"
		],
		"clive madande": [
			"https://www.espncricinfo.com/cricketers/clive-madande-1045883",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345225.5.jpg"
		],
		"lindokuhle mabhero": [
			"https://www.espncricinfo.com/cricketers/lindokuhle-mabhero-1302733",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"tinashe kamunhukamwe": [
			"https://www.espncricinfo.com/cricketers/tinashe-kamunhukamwe-713811",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179700/179739.1.jpg"
		],
		"takudzwanashe kaitano": [
			"https://www.espncricinfo.com/cricketers/takudzwanashe-kaitano-493765",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345218.4.jpg"
		],
		"innocent kaia": [
			"https://www.espncricinfo.com/cricketers/innocent-kaia-465327",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345222.4.jpg"
		],
		"luke jongwe": [
			"https://www.espncricinfo.com/cricketers/luke-jongwe-541224",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345223.5.jpg"
		],
		"nyasha gwanzura": [
			"https://www.espncricinfo.com/cricketers/nyasha-gwanzura-922491",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"trevor gwandu": [
			"https://www.espncricinfo.com/cricketers/trevor-gwandu-1038205",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"joylord gumbie": [
			"https://www.espncricinfo.com/cricketers/joylord-gumbie-596376",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179700/179745.1.jpg"
		],
		"faraz akram": [
			"https://www.espncricinfo.com/cricketers/faraz-akram-1122851",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"brad evans": [
			"https://www.espncricinfo.com/cricketers/brad-evans-696127",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/345200/345226.4.jpg"
		],
		"craig ervine": [
			"https://www.espncricinfo.com/cricketers/craig-ervine-55412",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/203300/203333.1.jpg"
		],
		"chiedza dhururu": [
			"https://www.espncricinfo.com/cricketers/chiedza-dhururu-1094714",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"tanaka chivanga": [
			"https://www.espncricinfo.com/cricketers/tanaka-chivanga-1059122",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"francisca chipare": [
			"https://www.espncricinfo.com/cricketers/francisca-chipare-1119417",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"kudzai chigora": [
			"https://www.espncricinfo.com/cricketers/kudzai-chigora-1302575",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"tendai chatara": [
			"https://www.espncricinfo.com/cricketers/tendai-chatara-425639",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/203300/203357.1.jpg"
		],
		"johnathan campbell": [
			"https://www.espncricinfo.com/cricketers/johnathan-campbell-1120613",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"ryan burl": [
			"https://www.espncricinfo.com/cricketers/ryan-burl-495964",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/179700/179753.1.jpg"
		],
		"beloved biza": [
			"https://www.espncricinfo.com/cricketers/beloved-biza-1302686",
			"https://wassets.hscicdn.com/static/images/player-jersey-dark.svg"
		],
		"brian bennett": [
			"https://www.espncricinfo.com/cricketers/brian-bennett-1071484",
			"https://img1.hscicdn.com/image/upload/f_auto,t_h_100_2x/lsci/db/PICTURES/CMS/338100/338174.4.jpg"
		]
	})

	names.sort()



	const fetchDataFromServer = async (playerName) => {
		let response = await axiosInstance.post(`/api/fetch/get-player-profile`, {
		
			"question": `Player profile of ${playerName}`,
			"playerName": playerName			
		}, 
		{
			headers: {
				"Content-Type": "application/json"
			},
		})

		let jsonData = response.data
		setResponseItems(responseItems => [...responseItems, jsonData["response"]])
		setIsInputDisabled(false)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		setIsInputDisabled(true)
		const value = e.target.value
		if (value === "null") {
			alert("Select a match")
			return
		}
		console.log("selected option: ", value)
		setSelectedOption(value)
		fetchDataFromServer(value); // Fetch data with the value directly from the event
	}

	return (
		<div className="overall-container">

			<LeftPanel setResponseItems={setResponseItems}/>


			<div className="center-panel-container">

				<Title subtitle={'Player profile and statistics'}/>

				<div className="response-box">
					<RenderOutput frontendList={responseItems} />
					<div ref={dummy} className="loading-box" style={{ display: (isInputDisabled == true ? "block" : "none") }}>
						<p>Loading...</p>
					</div>
					<div ref={dummy}></div>
				</div>
				<div className="input-box">
					<form>
						<select value={selectedOption} onChange={handleSubmit}>
							<option value="null">Select player</option>
							{
								names.map((name, idx) => (
									<option value={name}>{name.at(0).toUpperCase() + name.slice(1)}</option>
								))
							}
						</select>
					</form>
				</div>
			</div>
		</div>
	)
}

export default IPLPointsTable
