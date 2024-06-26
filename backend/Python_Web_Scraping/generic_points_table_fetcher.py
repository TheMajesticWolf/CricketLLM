import re
import bs4
import sys
import json
import requests

inp = json.loads(sys.stdin.read())

given_question = inp["question"] or None
matchType = inp["matchType"] or None



class PointsTableFetcher:

	def get_ipl_points_table(self):


		output = {
				"IPL 2024": [
					[
						"No",
						"Team",
						"M",
						"W",
						"L",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Pts",
						"Form (1......14)"
					],
					[
						"1",
						"KKR (Kolkata) (Q)",
						"14",
						"9",
						"3",
						"2",
						"+1.428",
						"2389/225.0",
						"2135/232.2",
						"20",
						"WWWLWLWLWWWWN"
					],
					[
						"2",
						"SRH (Hyderabad) (Q)",
						"14",
						"8",
						"5",
						"1",
						"+0.414",
						"2605/247.0",
						"2599/256.3",
						"17",
						"LWLWWWWLLWLWNW"
					],
					[
						"3",
						"RR (Rajasthan) (Q)",
						"14",
						"8",
						"5",
						"1",
						"+0.273",
						"2334/252.1",
						"2310/257.1",
						"17",
						"WWWWLWWWWLLLLN"
					],
					[
						"4",
						"RCB (Bangalore) (Q)",
						"14",
						"7",
						"7",
						"0",
						"+0.459",
						"2758/269.0",
						"2646/270.1",
						"14",
						"LWLLLLLLWWWWWW"
					],
					[
						"5",
						"CSK (Chennai) (E)",
						"14",
						"7",
						"7",
						"0",
						"+0.392",
						"2524/274.4",
						"2415/274.3",
						"14",
						"WWLLWWLLWLWLWL"
					],
					[
						"6",
						"DC (Delhi) (E)",
						"14",
						"7",
						"7",
						"0",
						"-0.377",
						"2573/267.0",
						"2762/275.5",
						"14",
						"LLWLLWWLWWLWLW"
					],
					[
						"7",
						"LSG (Lucknow) (E)",
						"14",
						"7",
						"7",
						"0",
						"-0.667",
						"2483/277.5",
						"2521/262.3",
						"14",
						"LWWWLLWWLWLLLW"
					],
					[
						"8",
						"GT (Gujarat) (E)",
						"14",
						"5",
						"7",
						"2",
						"-1.063",
						"2040/238.2",
						"2101/218.2",
						"12",
						"WLWLLWLWLLLWNN"
					],
					[
						"9",
						"PBKS (Punjab) (E)",
						"14",
						"5",
						"9",
						"0",
						"-0.353",
						"2487/274.3",
						"2612/277.3",
						"10",
						"WLLWLLLLWWLLWL"
					],
					[
						"10",
						"MI (Mumbai) (E)",
						"14",
						"4",
						"10",
						"0",
						"-0.318",
						"2568/268.5",
						"2660/269.3",
						"8",
						"LLLWWLWLLLLWLL"
					]
				],
				"IPL 2023": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"GT (Gujarat)",
						"14",
						"10",
						"4",
						"0",
						"0.809",
						"2450/268.1",
						"2326/279.2",
						"20"
					],
					[
						"2",
						"CSK (Chennai)",
						"14",
						"8",
						"5",
						"1",
						"0.652",
						"2369/254.3",
						"2232/257.5",
						"17"
					],
					[
						"3",
						"LSG (Lucknow)",
						"14",
						"8",
						"5",
						"1",
						"0.284",
						"2253/255.2",
						"2216/259.3",
						"17"
					],
					[
						"4",
						"MI (Mumbai)",
						"14",
						"8",
						"6",
						"0",
						"-0.044",
						"2592/270.3",
						"2620/272.1",
						"16"
					],
					[
						"5",
						"RR (Rajasthan)",
						"14",
						"7",
						"7",
						"0",
						"0.148",
						"2419/272.1",
						"2389/273.2",
						"14"
					],
					[
						"6",
						"RCB (Bangalore)",
						"14",
						"7",
						"7",
						"0",
						"0.135",
						"2502/275.4",
						"2435/272.2",
						"14"
					],
					[
						"7",
						"KKR (Kolkata)",
						"14",
						"6",
						"8",
						"0",
						"-0.239",
						"2463/274.3",
						"2432/264.0",
						"12"
					],
					[
						"8",
						"PBKS (Punjab)",
						"14",
						"6",
						"8",
						"0",
						"-0.304",
						"2518/275.3",
						"2564/271.3",
						"12"
					],
					[
						"9",
						"DC (Delhi)",
						"14",
						"5",
						"9",
						"0",
						"-0.808",
						"2182/276.0",
						"2424/278.1",
						"10"
					],
					[
						"10",
						"SRH (Hyderabad)",
						"14",
						"4",
						"10",
						"0",
						"-0.590",
						"2376/277.1",
						"2486/271.2",
						"8"
					]
				],
				"IPL 2022": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"GT (Gujarat)",
						"14",
						"10",
						"4",
						"0",
						"0.316",
						"2339/278.1",
						"2216/273.5",
						"20"
					],
					[
						"2",
						"RR (Rajasthan)",
						"14",
						"9",
						"5",
						"0",
						"0.298",
						"2464/279.2",
						"2351/275.5",
						"18"
					],
					[
						"3",
						"LSG (Lucknow)",
						"14",
						"9",
						"5",
						"0",
						"0.251",
						"2355/279.1",
						"2289/279.4",
						"18"
					],
					[
						"4",
						"RCB (Bangalore)",
						"14",
						"8",
						"6",
						"0",
						"-0.253",
						"2268/275.4",
						"2260/266.3",
						"16"
					],
					[
						"5",
						"DC (Delhi)",
						"14",
						"7",
						"7",
						"0",
						"0.204",
						"2341/266.0",
						"2397/278.5",
						"14"
					],
					[
						"6",
						"PBKS (Punjab)",
						"14",
						"7",
						"7",
						"0",
						"0.126",
						"2343/270.1",
						"2252/263.3",
						"14"
					],
					[
						"7",
						"KKR (Kolkata)",
						"14",
						"6",
						"8",
						"0",
						"0.146",
						"2223/268.1",
						"2249/276.1",
						"12"
					],
					[
						"8",
						"SRH (Hyderabad)",
						"14",
						"6",
						"8",
						"0",
						"-0.379",
						"2197/261.3",
						"2416/275.1",
						"12"
					],
					[
						"9",
						"CSK (Chennai)",
						"14",
						"4",
						"10",
						"0",
						"-0.203",
						"2288/280.0",
						"2254/269.1",
						"8"
					],
					[
						"10",
						"MI (Mumbai)",
						"14",
						"4",
						"10",
						"0",
						"-0.506",
						"2217/273.2",
						"2351/272.5",
						"8"
					]
				],
				"IPL 2021": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"DC (Delhi)",
						"14",
						"10",
						"4",
						"0",
						"+0.481",
						"2180/267.0",
						"2136/278.0",
						"20"
					],
					[
						"2",
						"CSK (Chennai)",
						"14",
						"9",
						"5",
						"0",
						"+0.455",
						"2368/272.0",
						"2218/268.5",
						"18"
					],
					[
						"3",
						"RCB (Bangalore)",
						"14",
						"9",
						"5",
						"0",
						"-0.140",
						"2165/273.4",
						"2159/268.1",
						"18"
					],
					[
						"4",
						"KKR (Kolkata)",
						"14",
						"7",
						"7",
						"0",
						"+0.587",
						"2119/259.5",
						"2080/274.5",
						"14"
					],
					[
						"5",
						"MI (Mumbai)",
						"14",
						"7",
						"7",
						"0",
						"+0.116",
						"2117/265.5",
						"2128/271.1",
						"14"
					],
					[
						"6",
						"PBKS (Punjab)",
						"14",
						"6",
						"8",
						"0",
						"-0.001",
						"2150/270.1",
						"2117/266.0",
						"12"
					],
					[
						"7",
						"RR (Rajasthan)",
						"14",
						"5",
						"9",
						"0",
						"-0.993",
						"2196/276.0",
						"2318/259.0",
						"10"
					],
					[
						"8",
						"SRH (Hyderabad)",
						"14",
						"3",
						"11",
						"0",
						"-0.545",
						"2077/277.1",
						"2216/275.4",
						"6"
					]
				],
				"IPL 2020": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"MI",
						"14",
						"9",
						"5",
						"0",
						"+1.107",
						"2378/262.2",
						"2187/274.5",
						"18"
					],
					[
						"2",
						"DC",
						"14",
						"8",
						"6",
						"0",
						"-0.109",
						"2289/278.5",
						"2271/273.0",
						"16"
					],
					[
						"3",
						"SRH",
						"14",
						"7",
						"7",
						"0",
						"+0.608",
						"2225/269.3",
						"2125/277.5",
						"14"
					],
					[
						"4",
						"RCB",
						"14",
						"7",
						"7",
						"0",
						"-0.172",
						"2147/272.2",
						"2183/271.0",
						"14"
					],
					[
						"5",
						"KKR",
						"14",
						"7",
						"7",
						"0",
						"-0.214",
						"2219/278.0",
						"2206/269.1",
						"14"
					],
					[
						"6",
						"PBKS",
						"14",
						"6",
						"8",
						"0",
						"-0.162",
						"2335/277.5",
						"2343/273.3",
						"12"
					],
					[
						"7",
						"CSK",
						"14",
						"6",
						"8",
						"0",
						"-0.455",
						"2191/274.3",
						"2275/269.4",
						"12"
					],
					[
						"8",
						"RR",
						"14",
						"6",
						"8",
						"0",
						"-0.569",
						"2288/272.4",
						"2482/277.0",
						"12"
					]
				],
				"IPL 2019": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"MI",
						"14",
						"9",
						"5",
						"0",
						"+0.421",
						"2380/275.1",
						"2282/277.2",
						"18"
					],
					[
						"2",
						"CSK",
						"14",
						"9",
						"5",
						"0",
						"+0.131",
						"2043/274.1",
						"2012/274.5",
						"18"
					],
					[
						"3",
						"DC",
						"14",
						"9",
						"5",
						"0",
						"+0.044",
						"2207/272.5",
						"2238/278.1",
						"18"
					],
					[
						"4",
						"SRH",
						"14",
						"6",
						"8",
						"0",
						"+0.577",
						"2288/269.2",
						"2200/277.5",
						"12"
					],
					[
						"5",
						"KKR",
						"14",
						"6",
						"8",
						"0",
						"+0.028",
						"2466/270.4",
						"2419/266.2",
						"12"
					],
					[
						"6",
						"PBKS",
						"14",
						"6",
						"8",
						"0",
						"-0.251",
						"2429/276.3",
						"2503/277.0",
						"12"
					],
					[
						"7",
						"RR",
						"14",
						"5",
						"8",
						"1",
						"-0.449",
						"2153/257.0",
						"2192/248.2",
						"11"
					],
					[
						"8",
						"RCB",
						"14",
						"5",
						"8",
						"1",
						"-0.607",
						"2146/258.4",
						"2266/254.3",
						"11"
					]
				],
				"IPL 2018": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"SRH",
						"14",
						"9",
						"5",
						"0",
						"+0.284",
						"2230/273.3",
						"2193/278.4",
						"18"
					],
					[
						"2",
						"CSK",
						"14",
						"9",
						"5",
						"0",
						"+0.253",
						"2488/275.3",
						"2433/277.1",
						"18"
					],
					[
						"3",
						"KKR",
						"14",
						"8",
						"6",
						"0",
						"-0.070",
						"2363/265.1",
						"2425/270.0",
						"16"
					],
					[
						"4",
						"RR",
						"14",
						"7",
						"7",
						"0",
						"-0.250",
						"2130/255.3",
						"2141/249.2",
						"14"
					],
					[
						"5",
						"MI",
						"14",
						"6",
						"8",
						"0",
						"+0.317",
						"2380/278.4",
						"2282/277.3",
						"12"
					],
					[
						"6",
						"RCB",
						"14",
						"6",
						"8",
						"0",
						"+0.129",
						"2322/264.4",
						"2383/275.4",
						"12"
					],
					[
						"7",
						"PBKS",
						"14",
						"6",
						"8",
						"0",
						"-0.502",
						"2210/268.4",
						"2259/258.5",
						"12"
					],
					[
						"8",
						"DC",
						"14",
						"5",
						"9",
						"0",
						"-0.222",
						"2297/258.0",
						"2304/252.3",
						"10"
					]
				],
				"IPL 2017": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"MI",
						"14",
						"10",
						"4",
						"0",
						"+0.784",
						"2407/272.1",
						"2242/278.1",
						"20"
					],
					[
						"2",
						"RPS",
						"14",
						"9",
						"5",
						"0",
						"+0.176",
						"2180/271.0",
						"2165/275.1",
						"18"
					],
					[
						"3",
						"SRH",
						"14",
						"8",
						"5",
						"1",
						"+0.599",
						"2221/252.0",
						"2118/257.5",
						"17"
					],
					[
						"4",
						"KKR",
						"14",
						"8",
						"6",
						"0",
						"+0.641",
						"2329/260.5",
						"2300/277.3",
						"16"
					],
					[
						"5",
						"PBKS",
						"14",
						"7",
						"7",
						"0",
						"-0.009",
						"2207/261.2",
						"2229/263.4",
						"14"
					],
					[
						"6",
						"DC",
						"14",
						"6",
						"8",
						"0",
						"-0.512",
						"2219/276.2",
						"2255/264.0",
						"12"
					],
					[
						"7",
						"GL",
						"14",
						"4",
						"10",
						"0",
						"-0.412",
						"2406/269.5",
						"2472/265.0",
						"8"
					],
					[
						"8",
						"RCB",
						"14",
						"3",
						"10",
						"1",
						"-1.299",
						"1845/260.0",
						"2033/242.1",
						"7"
					]
				],
				"IPL 2016": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"GL",
						"14",
						"9",
						"5",
						"0",
						"-0.374",
						"2130/264.3",
						"2285/271.1",
						"18"
					],
					[
						"2",
						"RCB",
						"14",
						"8",
						"6",
						"0",
						"+0.932",
						"2613/270.2",
						"2345/268.3",
						"16"
					],
					[
						"3",
						"SRH",
						"14",
						"8",
						"6",
						"0",
						"+0.245",
						"2082/259.5",
						"2078/267.3",
						"16"
					],
					[
						"4",
						"KKR",
						"14",
						"8",
						"6",
						"0",
						"+0.106",
						"2123/253.2",
						"2121/256.2",
						"16"
					],
					[
						"5",
						"MI",
						"14",
						"7",
						"7",
						"0",
						"-0.146",
						"2194/272.2",
						"2190/267.0",
						"14"
					],
					[
						"6",
						"DC",
						"14",
						"7",
						"7",
						"0",
						"-0.155",
						"2040/259.1",
						"2107/262.3",
						"14"
					],
					[
						"7",
						"RPS",
						"14",
						"5",
						"9",
						"0",
						"+0.015",
						"2025/244.5",
						"1991/241.1",
						"10"
					],
					[
						"8",
						"PBKS",
						"14",
						"4",
						"10",
						"0",
						"-0.646",
						"2134/269.4",
						"2224/259.5",
						"8"
					]
				],
				"IPL 2015": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"CSK",
						"14",
						"9",
						"5",
						"0",
						"+0.709",
						"2262/273.3",
						"2073/274.1",
						"18"
					],
					[
						"2",
						"MI",
						"14",
						"8",
						"6",
						"0",
						"-0.043",
						"2345/272.4",
						"2371/274.2",
						"16"
					],
					[
						"3",
						"RCB",
						"14",
						"7",
						"5",
						"2",
						"+1.037",
						"1790/191.1",
						"1693/203.2",
						"16"
					],
					[
						"4",
						"RR",
						"14",
						"7",
						"5",
						"2",
						"+0.062",
						"2028/237.3",
						"2002/236.1",
						"16"
					],
					[
						"5",
						"KKR",
						"14",
						"7",
						"6",
						"1",
						"+0.253",
						"2044/236.1",
						"2022/240.4",
						"15"
					],
					[
						"6",
						"SRH",
						"14",
						"7",
						"7",
						"0",
						"-0.239",
						"2096/255.2",
						"2126/251.4",
						"14"
					],
					[
						"7",
						"DC",
						"14",
						"5",
						"8",
						"1",
						"-0.049",
						"1981/250.2",
						"1976/248.1",
						"11"
					],
					[
						"8",
						"PBKS",
						"14",
						"3",
						"11",
						"0",
						"-1.436",
						"2003/270.0",
						"2286/258.1",
						"6"
					]
				],
				"IPL 2014": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"PBKS",
						"14",
						"11",
						"3",
						"0",
						"+0.968",
						"2427/268.3",
						"2229/276.1",
						"22"
					],
					[
						"2",
						"KKR",
						"14",
						"9",
						"5",
						"0",
						"+0.418",
						"2125/264.0",
						"2110/276.3",
						"18"
					],
					[
						"3",
						"CSK",
						"14",
						"9",
						"5",
						"0",
						"+0.385",
						"2272/272.0",
						"2178/273.2",
						"18"
					],
					[
						"4",
						"MI",
						"14",
						"7",
						"7",
						"0",
						"+0.095",
						"2180/271.3",
						"2170/273.3",
						"14"
					],
					[
						"5",
						"RR",
						"14",
						"7",
						"7",
						"0",
						"+0.060",
						"2155/269.5",
						"2164/273.0",
						"14"
					],
					[
						"6",
						"SRH",
						"14",
						"6",
						"8",
						"0",
						"-0.399",
						"2102/263.4",
						"2136/255.1",
						"12"
					],
					[
						"7",
						"RCB",
						"14",
						"5",
						"9",
						"0",
						"-0.428",
						"2093/273.5",
						"2163/268.0",
						"10"
					],
					[
						"8",
						"DC",
						"14",
						"2",
						"12",
						"0",
						"-1.182",
						"1980/263.2",
						"2184/251.0",
						"4"
					]
				],
				"IPL 2013": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"CSK",
						"16",
						"11",
						"5",
						"0",
						"+0.530",
						"2461/303.5",
						"2310/305.1",
						"22"
					],
					[
						"2",
						"MI",
						"16",
						"11",
						"5",
						"0",
						"+0.441",
						"2514/318.1",
						"2350/315.0",
						"22"
					],
					[
						"3",
						"RR",
						"16",
						"10",
						"6",
						"0",
						"+0.322",
						"2405/310.5",
						"2326/313.4",
						"20"
					],
					[
						"4",
						"SRH",
						"16",
						"10",
						"6",
						"0",
						"+0.003",
						"2166/308.5",
						"2206/314.4",
						"20"
					],
					[
						"5",
						"RCB",
						"16",
						"9",
						"7",
						"0",
						"+0.457",
						"2571/301.0",
						"2451/303.1",
						"18"
					],
					[
						"6",
						"PBKS",
						"16",
						"8",
						"8",
						"0",
						"+0.226",
						"2428/305.2",
						"2417/312.5",
						"16"
					],
					[
						"7",
						"KKR",
						"16",
						"6",
						"10",
						"0",
						"-0.095",
						"2290/313.4",
						"2316/313.1",
						"12"
					],
					[
						"8",
						"PWI",
						"16",
						"4",
						"12",
						"0",
						"-1.006",
						"2262/318.4",
						"2519/310.5",
						"8"
					],
					[
						"9",
						"DC",
						"16",
						"3",
						"13",
						"0",
						"-0.848",
						"2234/314.5",
						"2436/306.4",
						"6"
					]
				],
				"IPL 2012": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"DC",
						"16",
						"11",
						"5",
						"0",
						"+0.617",
						"2365/283.5",
						"2361/306.0",
						"22"
					],
					[
						"2",
						"KKR",
						"16",
						"10",
						"5",
						"1",
						"+0.561",
						"2150/285.1",
						"2032/291.1",
						"21"
					],
					[
						"3",
						"MI",
						"16",
						"10",
						"6",
						"0",
						"-0.100",
						"2313/312.3",
						"2343/312.2",
						"20"
					],
					[
						"4",
						"CSK",
						"16",
						"8",
						"7",
						"1",
						"+0.100",
						"2232/293.3",
						"2144/285.4",
						"17"
					],
					[
						"5",
						"RCB",
						"16",
						"8",
						"7",
						"1",
						"-0.022",
						"2472/296.2",
						"2505/299.3",
						"17"
					],
					[
						"6",
						"PBKS",
						"16",
						"8",
						"8",
						"0",
						"-0.216",
						"2390/313.3",
						"2455/313.1",
						"16"
					],
					[
						"7",
						"RR",
						"16",
						"7",
						"9",
						"0",
						"+0.201",
						"2516/316.0",
						"2402/309.3",
						"14"
					],
					[
						"8",
						"DCH",
						"16",
						"4",
						"11",
						"1",
						"-0.509",
						"2312/298.4",
						"2405/291.3",
						"9"
					],
					[
						"9",
						"PWI",
						"16",
						"4",
						"12",
						"0",
						"-0.551",
						"2321/319.2",
						"2424/310.0",
						"8"
					]
				],
				"IPL 2011": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"RCB",
						"14",
						"9",
						"4",
						"1",
						"+0.326",
						"1962/237.0",
						"2000/251.3",
						"19"
					],
					[
						"2",
						"CSK",
						"14",
						"9",
						"5",
						"0",
						"+0.443",
						"2118/265.1",
						"1978/262.1",
						"18"
					],
					[
						"3",
						"MI",
						"14",
						"9",
						"5",
						"0",
						"+0.040",
						"1998/275.2",
						"1951/270.2",
						"18"
					],
					[
						"4",
						"KKR",
						"14",
						"8",
						"6",
						"0",
						"+0.433",
						"1888/249.2",
						"1861/260.4",
						"16"
					],
					[
						"5",
						"PBKS",
						"14",
						"7",
						"7",
						"0",
						"-0.051",
						"2224/275.4",
						"2173/267.4",
						"14"
					],
					[
						"6",
						"RR",
						"14",
						"6",
						"7",
						"1",
						"-0.691",
						"1687/242.2",
						"1801/235.2",
						"13"
					],
					[
						"7",
						"DCH",
						"14",
						"6",
						"8",
						"0",
						"+0.222",
						"2140/279.2",
						"2037/273.5",
						"12"
					],
					[
						"8",
						"KTK",
						"14",
						"6",
						"8",
						"0",
						"-0.214",
						"1901/256.2",
						"1989/260.4",
						"12"
					],
					[
						"9",
						"PWI",
						"14",
						"4",
						"9",
						"1",
						"-0.134",
						"1775/247.3",
						"1858/254.2",
						"9"
					],
					[
						"10",
						"DC",
						"14",
						"4",
						"9",
						"1",
						"-0.448",
						"2031/258.2",
						"2076/249.5",
						"9"
					]
				],
				"IPL 2010": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"MI",
						"14",
						"10",
						"4",
						"0",
						"+1.084",
						"2408/277.0",
						"2100/276.0",
						"20"
					],
					[
						"2",
						"DCH",
						"14",
						"8",
						"6",
						"0",
						"-0.297",
						"2188/277.4",
						"2254/275.4",
						"16"
					],
					[
						"3",
						"CSK",
						"14",
						"7",
						"7",
						"0",
						"+0.274",
						"2285/271.1",
						"2257/276.5",
						"14"
					],
					[
						"4",
						"RCB",
						"14",
						"7",
						"7",
						"0",
						"+0.219",
						"2166/260.4",
						"2245/277.3",
						"14"
					],
					[
						"5",
						"DC",
						"14",
						"7",
						"7",
						"0",
						"+0.021",
						"2155/275.4",
						"2166/277.5",
						"14"
					],
					[
						"6",
						"KKR",
						"14",
						"7",
						"7",
						"0",
						"-0.341",
						"2144/273.0",
						"2192/267.3",
						"14"
					],
					[
						"7",
						"RR",
						"14",
						"6",
						"8",
						"0",
						"-0.514",
						"2179/270.4",
						"2224/259.4",
						"12"
					],
					[
						"8",
						"PBKS",
						"14",
						"4",
						"10",
						"0",
						"-0.478",
						"2278/276.2",
						"2365/271.1",
						"8"
					]
				],
				"IPL 2009": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"DC",
						"14",
						"10",
						"4",
						"0",
						"+0.311",
						"1978/255.2",
						"1953/262.4",
						"20"
					],
					[
						"2",
						"CSK",
						"14",
						"8",
						"5",
						"1",
						"+0.951",
						"2086/255.3",
						"1855/257.1",
						"17"
					],
					[
						"3",
						"RCB",
						"14",
						"8",
						"6",
						"0",
						"-0.191",
						"1994/276.0",
						"2027/273.2",
						"16"
					],
					[
						"4",
						"DCH",
						"14",
						"7",
						"7",
						"0",
						"+0.203",
						"2111/272.4",
						"2097/278.1",
						"14"
					],
					[
						"5",
						"PBKS",
						"14",
						"7",
						"7",
						"0",
						"-0.483",
						"1787/251.2",
						"1887/248.3",
						"14"
					],
					[
						"6",
						"RR",
						"14",
						"6",
						"7",
						"1",
						"-0.352",
						"1688/253.1",
						"1810/257.5",
						"13"
					],
					[
						"7",
						"MI",
						"14",
						"5",
						"8",
						"1",
						"+0.297",
						"1897/256.2",
						"1802/253.4",
						"11"
					],
					[
						"8",
						"KKR",
						"14",
						"3",
						"10",
						"1",
						"-0.789",
						"1757/248.5",
						"1867/237.5",
						"7"
					]
				],
				"IPL 2008": [
					[
						"Rank",
						"Team",
						"Match",
						"Won",
						"Lost",
						"N/R",
						"Net RR",
						"For",
						"Against",
						"Points"
					],
					[
						"1",
						"RR",
						"14",
						"11",
						"3",
						"0",
						"+0.632",
						"2245/261.1",
						"2153/270.2",
						"22"
					],
					[
						"2",
						"PBKS",
						"14",
						"10",
						"4",
						"0",
						"+0.509",
						"2352/259.5",
						"2271/265.5",
						"20"
					],
					[
						"3",
						"CSK",
						"14",
						"8",
						"6",
						"0",
						"-0.192",
						"2241/264.2",
						"2195/253.1",
						"16"
					],
					[
						"4",
						"DC",
						"14",
						"7",
						"6",
						"1",
						"+0.342",
						"2001/233.2",
						"2031/246.4",
						"15"
					],
					[
						"5",
						"MI",
						"14",
						"7",
						"7",
						"0",
						"+0.570",
						"2080/249.1",
						"2096/269.3",
						"14"
					],
					[
						"6",
						"KKR",
						"14",
						"6",
						"7",
						"1",
						"-0.147",
						"1845/242.4",
						"1718/221.4",
						"13"
					],
					[
						"7",
						"RCB",
						"14",
						"4",
						"10",
						"0",
						"-1.160",
						"1983/272.4",
						"2205/261.3",
						"8"
					],
					[
						"8",
						"DCH",
						"14",
						"2",
						"12",
						"0",
						"-0.467",
						"2229/270.0",
						"2307/264.3",
						"4"
					]
				]
			}
		return output
		
		url = r"https://statisticstimes.com/sports/ipl/all-ipl-points-table.php"

		response = requests.get(url).text
		soup = bs4.BeautifulSoup(response, "html.parser")

		tables = soup.find_all("table", attrs={"class": "display"})

		output_dict = dict()

		# c = 0

		for table in tables:

			# table = soup.find("table", attrs={"class": "display"})

			rows = table.find_all("tr")

			headers = rows[0].find_all("th") 
			headers = list(map(lambda tag: tag.text.strip(), headers))

			result = [row.find_all("td") for row in rows]

			final = []

			final.append(headers)
		
			for row in result:
				tmp = []
				if(len(row) != 0):
					for column in row:
						tmp.append(column.text.strip())
					final.append(tmp)


			try:
				table_title = table.find("caption").text.strip()
				match_year = table_title.split(" ")[1]
				if(table_title.startswith("IPL")):
					output_dict[int(match_year)] = final
					
			except Exception as e:
				print(e)

		output_dict = dict(sorted(output_dict.items(), key=lambda x: x[0], reverse=True))

		return output_dict


	def get_t20_table(self):
		
		url = r"https://www.espncricinfo.com/series/icc-men-s-t20-world-cup-2024-1411166/points-table-standings"
		soup = bs4.BeautifulSoup(requests.get(url).text, "html.parser")

		overall_container = soup.find("div", attrs={"class": "ds-w-full ds-bg-fill-content-prime ds-overflow-hidden ds-rounded-xl ds-border ds-border-line"})

		groups = soup.find_all("span", attrs={"class": "ds-text-tight-s ds-font-bold ds-uppercase"})
		groups = [item.get_text() for item in groups]

		tables = overall_container.find_all("table", attrs={"class": "ds-w-full ds-table ds-table-md ds-table-auto ds-w-full"})

		to_return = dict()


		for outer_idx, table in enumerate(tables):

			two_d = []

			headers = table.find("tr")
			headers = [item.get_text() for item in headers.find_all("th")]
			two_d.append(headers)

			rows = table.find_all("tr")

			for row in rows[1::2]:
				# teams = row.find_all("span", attrs={"class": "ds-text-tight-s ds-font-bold ds-uppercase ds-text-left ds-text-typo"})
				# teams = [item.get_text() for item in teams]
				

				cols = [col for col in row.find_all("td")]
				cols = [item.get_text() for item in cols]
				cols[0] = re.findall(r"[^\d]+", cols[0])[0]
			
			
				two_d.append(cols)

			to_return[groups[outer_idx]] = two_d

		
		return to_return



ptf = PointsTableFetcher()

if(re.search(r"IPL \d+.*", matchType)):
	output = ptf.get_ipl_points_table()
	output = {matchType: output[matchType]}

elif(re.search(r"T20 World Cup 2024", matchType)):
	output = ptf.get_t20_table()


sys.stdout.write(json.dumps({"output": output, "return_format": "ipl_points_table", "question": given_question}))

