import { CaseStudy } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cdr-murder',
    category: 'cdr',
    title: 'Case CDR-101: Greater Kailash Homicide',
    shortDescription: 'Break a false alibi in New Delhi by mapping cell tower connections and identifying suspect movements near Siri Fort.',
    difficulty: 'Medium',
    summary: 'A wealthy jewellery merchant in Greater Kailash, New Delhi, was found murdered in his villa. Prime suspect Vikram Malhotra claims he was sleeping at a local highway dhaba near Sonipat, 45 kilometres away.',
    backgroundStory: 'Senior Detective Rajesh Shinde of Delhi Police Crime Branch has brought you onto the team. You have been handed Vikram Malhotra\'s subscriber call detail history (CDR) along with the regional cell tower directory of South Delhi and the Highway corridor. Simply trace Vikram\'s device registrations on the night of April 12th to verify if he was actually in Sonipat or at the murder spot.',
    objective: 'Match cellular sector logs, locate the physical tower active at 23:45, identify Malhotra’s core co-conspirator, check longest incoming call duration, and verify device hardware details.',
    evidenceFiles: [
      {
        name: 'suspect_vikram_m_cdr.csv',
        size: '14 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Call Detail Records of Vikram Malhotra’s primary line showing timestamps, tower cell codes, call types, and target phone numbers.'
      },
      {
        name: 'delhi_ncr_tower_directory.csv',
        size: '9 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Complete directory map mapping Tower IDs, physical areas (Saket, Siri Fort, Sonipat), antenna heights, and directivity patterns.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'Which specific cell tower ID did Vikram’s phone register on at 23:45 PM on April 12th?',
        hint: 'Search the suspect_vikram_m_cdr.csv file around 23:45 PM to read the Tower ID.',
        correctKeywords: ['twr-dock-09', 'dock-09', 'dock_09'],
        solutionText: 'TWR-DOCK-09 (Siri Fort / Waterfront South Central Tower - putting Vikram directly at the crime location, debunking his Sonipat alibi).'
      },
      {
        id: 'q2',
        question: 'What is the mobile phone number of Vikram’s most frequently contacted partner-in-crime?',
        hint: 'Count the occurrences of caller/recipient phone numbers linked in the log to find the highest frequency.',
        correctKeywords: ['98450-12888', '9845012888'],
        solutionText: '+91-98450-12888 (This co-conspirator phone shows 5 separate calls on the crime night)'
      },
      {
        id: 'q3',
        question: 'What is the duration in seconds of the longest incoming call Vikram received during the alibi window?',
        hint: 'Filter for traffic type "Incoming" in the CDR and find the maximum Value in the Duration_Seconds column.',
        correctKeywords: ['1420'],
        solutionText: '1420 seconds (approx 23 minutes long incoming call, likely coordination)'
      },
      {
        id: 'q4',
        question: 'Which cell sector (Alpha, Beta, or Gamma) was Vikram’s device communicating on at 01:15 AM?',
        hint: 'Examine the 01:15 AM log entry and lookup the Sector column value.',
        correctKeywords: ['gamma', 'sector_gamma'],
        solutionText: 'Sector_Gamma (Indicating direction of escape towards Central Delhi)'
      },
      {
        id: 'q5',
        question: 'What unique hardware IMEI serial number is registered to Vikram’s illegal secondary handset?',
        hint: 'Look up the IMEI header column under Vikram’s CDR record.',
        correctKeywords: ['860294028472019'],
        solutionText: '860294028472019 (Match this IMEI against handset databases to track purchases)'
      }
    ]
  },
  {
    id: 'cdr-kidnap',
    category: 'cdr',
    title: 'Case CDR-102: Bengaluru Ransom Call Tracing',
    shortDescription: 'Analyze cellular burner SIM logs in Bengaluru to trace a ransom call location and save a kid from an abandoned warehouse.',
    difficulty: 'Hard',
    summary: 'A tech startup founder\'s child was abducted outside a Bengaluru public school. The abductors are calling from an unverified pre-paid burner SIM to demand a ₹5 Crore ransom.',
    backgroundStory: 'Cyber Crime Unit Bengaluru, led by Inspector Kavitha Krishnan, intercepted the burner SIM’s recent tower registration metadata. Even without GPS, the cell-tower pings and tower directions can help us narrow down the area of the hideout.',
    objective: 'Identify the cell towers connected during ransom calls, calculate call durations, find network carrier details, and locate the holding site.',
    evidenceFiles: [
      {
        name: 'burner_sim_cdr_logs.csv',
        size: '18 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Network signal captures from the suspect burner SIM, recording timestamps, tower IDs, and channel ranges.'
      },
      {
        name: 'extortion_call_intercepts.txt',
        size: '5 KB',
        type: 'TXT',
        category: 'CDR',
        description: 'Tapped phone recording summary detailing exact local times when extortion calls were placed.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'Which specific cell tower ID registered the suspect burner SIM during the first ransom call at 15:10 IST?',
        hint: 'Match the 15:10 ransom call timestamp with the nearest row inside burner_sim_cdr_logs.csv.',
        correctKeywords: ['twr-sub-94', 'sub-94', 'sub_94'],
        solutionText: 'TWR-SUB-94 (Suburban Bengaluru Outskirts)'
      },
      {
        id: 'q2',
        question: 'What is the exact antenna coverage sector angle (in degrees) active during the 17:40 ransom call?',
        hint: 'Filter for the 17:40 entry and look at the Coverage_Sector or Sector Angle column.',
        correctKeywords: ['120'],
        solutionText: '120_Degrees (An angled directional sector covering industrial layouts)'
      },
      {
        id: 'q3',
        question: 'What is the Mobile Country Code and Network Code (MCC-MNC) carrier brand utilized by the burner SIM?',
        hint: 'Find the MCC_MNC column in the logs to read the code.',
        correctKeywords: ['404-45', 'airtel'],
        solutionText: '404-45 (Bharti Airtel Karnataka)'
      },
      {
        id: 'q4',
        question: 'How many total minutes of call time has this burner SIM active on the cellular network during the kidnapping day?',
        hint: 'Sum all duration rows in seconds in the burner log and divide by 60 to find the total minutes.',
        correctKeywords: ['42'],
        solutionText: '42 minutes (Cumulative conversation time)'
      },
      {
        id: 'q5',
        question: 'What is the full IMSI (International Mobile Subscriber Identity) code of this suspicious burner SIM?',
        hint: 'Look for the IMSI registry column inside burner_sim_cdr_logs.csv.',
        correctKeywords: ['404459827361542'],
        solutionText: '404459827361542 (This unique SIM card identity can be traced back to the dealer distributor)'
      }
    ]
  },
  {
    id: 'cdr-drugs',
    category: 'cdr',
    title: 'Case CDR-103: Colaba Drug Syndicate Link Analysis',
    shortDescription: 'Deconstruct a hub-and-spoke coordination ring in South Mumbai to uncover the main supplier supervising local drug drops.',
    difficulty: 'Easy',
    summary: 'The Narcotics Control Bureau (NCB) in Mumbai arrested three local street drug peddlers in Colaba. Their seized phones show contact logs referencing a single common dealer hot-number.',
    backgroundStory: 'Inspector Amit Sawant has asked you to analyze the communications logs from the three seized mobile phones. Individual dealers work separately to stay safe, but they all report back to a common supervisor nicknamed "Bhaijaan" (The Supplier) who tells them where to drop drug packets.',
    objective: 'Combine three distinct courier logs, find the central master phone number, count the overall event volume, locate peak hour, and track the main cell tower code.',
    evidenceFiles: [
      {
        name: 'courier_combined_cdr.csv',
        size: '22 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Aggregated contact log databases extracted from the smartphones of the 3 arrested drug peddlers.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'What is the central common phone number contacted by all the arrested peddlers?',
        hint: 'Look inside courier_combined_cdr.csv for the recurring recipient phone number matching the couriers.',
        correctKeywords: ['90011-33222', '9001133222'],
        solutionText: '+91-90011-33222 (The central supplier line)'
      },
      {
        id: 'q2',
        question: 'How many total phone and SMS events were recorded contacting this central hot-number?',
        hint: 'Count the total number of lines where this central phone is logged in courier_combined_cdr.csv.',
        correctKeywords: ['118'],
        solutionText: '118 total communication links recorded'
      },
      {
        id: 'q3',
        question: 'During which 1-hour window (24-hour format) does the coordination activity peak?',
        hint: 'Group the logs by hour to find the peak hour of activity.',
        correctKeywords: ['23:00', '23'],
        solutionText: '23:00-24:00 (11 PM to Midnight - this indicates midnight coordination activity)'
      },
      {
        id: 'q4',
        question: 'How many total SMS (text codes) were sent to this hotline, rather than voice calls?',
        hint: 'Look for "SMS" values under the Traffic_Type column and find their totals.',
        correctKeywords: ['84'],
        solutionText: '84 SMS events (Text codes are preferred to avoid voice voiceprint matching)'
      },
      {
        id: 'q5',
        question: 'What is the primary cell tower ID used by this drug supervisor to coordinate drug supplies?',
        hint: 'Examine the Base_Station tower column for the central supplier.',
        correctKeywords: ['twr-hub-01', 'hub-01'],
        solutionText: 'TWR-HUB-01 (Uran Bridge area tower, indicating the controller was operating from there)'
      }
    ]
  },
  {
    id: 'cdr-contract',
    category: 'cdr',
    title: 'Case CDR-104: Chennai Highway Contract Killing Conspiracy',
    shortDescription: 'Expose a contract killing plot in Chennai by proving that a primary phone and a hidden burner phone travelled together.',
    difficulty: 'Medium',
    summary: 'A political representative was targeted along the peaceful East Coast Road (ECR). The primary suspect claims he was at home in Adyar, but investigators found a hidden secondary burner phone.',
    backgroundStory: 'To construct perfect alibis, professional hitmen leave their primary smartphone switched on at home (making casual calls/internet queries) while carrying a secret "burner SIM" to execute the task. Chennai City Police Inspector Saravanan needs you to co-locate both devices to break this alibi.',
    objective: 'Track highway toll gate connections, locate simultaneous pings on the same cell tower, map the coordinator’s number, and trace the escape sector.',
    evidenceFiles: [
      {
        name: 'primary_alibi_phone_cdr.csv',
        size: '15 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Normal phone call and data log records active at the suspect\'s residential zone in Adyar.'
      },
      {
        name: 'burner_operative_phone_cdr.csv',
        size: '16 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Simultaneous cell tower pings captured for the secret secondary burner phone during the highway journey.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'Which specific highway toll cell tower did the secret burner phone connect to at 19:40?',
        hint: 'Check burner_operative_phone_cdr.csv for the tower ID matched at 19:40.',
        correctKeywords: ['twr-hwy-14', 'hwy-14'],
        solutionText: 'TWR-HWY-14 (ECR Highway Tollplaza Tower)'
      },
      {
        id: 'q2',
        question: 'At what exact hour (HH:00) did the primary phone and the secret burner phone register on the same cell tower?',
        hint: 'Locate the match where both devices clocked into the exact same Tower ID.',
        correctKeywords: ['22:00', '2200'],
        solutionText: '22:00 (10:00 PM - proves the suspect had retrieved both phones at the same place)'
      },
      {
        id: 'q3',
        question: 'What is the mobile phone number of the conspirator who made calls to both phones?',
        hint: 'Identify the common caller number that contacted both devices around the crime timeline.',
        correctKeywords: ['88877-66554', '8887766554'],
        solutionText: '+91-88877-66554 (The conspiracy mastermind helper)'
      },
      {
        id: 'q4',
        question: 'What is the registered home address billing Postal PIN (ZIP) code of the fake burner account?',
        hint: 'Examine the SIM_ZIP column in burner_operative_phone_cdr.csv.',
        correctKeywords: ['110001'],
        solutionText: '110001 (New Delhi Connaught Place area PIN code, indicating a fake interstate purchase)'
      },
      {
        id: 'q5',
        question: 'Which cell tower coverage sector did the suspect trigger immediately after the crime at 22:35 PM?',
        hint: 'Check the 22:35 PM entry in burner logs to see the sector name.',
        correctKeywords: ['crime-sec3', 'crime_sec3'],
        solutionText: 'TWR-CRIME-SEC3 (Directly placing him at the targeted murder scene on ECR)'
      }
    ]
  },
  {
    id: 'cdr-simswap',
    category: 'cdr',
    title: 'Case CDR-105: Jamtara SIM-Swap Banking Loot',
    shortDescription: 'Investigate a high-tech banking fraud by locating the time of a fraudulent duplicate SIM activation.',
    difficulty: 'Medium',
    summary: 'A retired professor in Salt Lake, Kolkata, lost ₹25 Lakh from his pension savings account after his mobile network suddenly went blank with "No Service" around midday.',
    backgroundStory: 'Organised fraudsters from the Jamtara cyber cluster used forged identity cards to file an emergency "lost SIM" swap at a local retail store. The West Bengal Cyber CID under Inspector Sneha Roy needs you to pinpoint the retail outlet and terminal that authorized this illegal swap.',
    objective: 'Isolate network disconnect codes, identify the fraudulent dealer, find the terminal ID, map the thief\'s handset, and track the OTP recipient number.',
    evidenceFiles: [
      {
        name: 'displaced_victim_sim_cdr.csv',
        size: '12 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Network connectivity timestamps of the victim’s legitimate SIM up to the disconnect event.'
      },
      {
        name: 'dealership_terminal_provisioning_logs.csv',
        size: '11 KB',
        type: 'CSV',
        category: 'CDR',
        description: 'Audit logs of the telecom operator database showing duplicate activations, physical locations, and clerk terminal logins.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'At what exact local time (HH:MM) did the victim\'s phone lose network coverage completely?',
        hint: 'Find the time of the DETACH_SIGNAL or the last CONNECTED status in displaced_victim_sim_cdr.csv.',
        correctKeywords: ['11:42', '1142'],
        solutionText: '11:42 AM (This is when the cellular network disconnected the victim\'s real SIM)'
      },
      {
        id: 'q2',
        question: 'Which dealer store location code authorized this duplicate SIM swapping request?',
        hint: 'Scan the dealership transaction logs near 11:42 AM to find the store branch.',
        correctKeywords: ['dlrs-west-09', 'west-09'],
        solutionText: 'DLRS-WEST-09 (Kolkata West Metro Branch)'
      },
      {
        id: 'q3',
        question: 'What was the specific hardware Terminal ID used to authorize this fraudulent duplicate?',
        hint: 'Read the Terminal_ID column for the 11:42 AM swap row in the dealer database.',
        correctKeywords: ['term-88402', '88402'],
        solutionText: 'TERM-88402'
      },
      {
        id: 'q4',
        question: 'What is the device hardware identifier (IMEI) of the thief\'s handset that first registered the swapped SIM?',
        hint: 'Look for the newly registered hardware device IMEI that checked into the cell network at 11:43 AM.',
        correctKeywords: ['359871100482710'],
        solutionText: '359871100482710'
      },
      {
        id: 'q5',
        question: 'To which external beneficiary mobile number did the thief set up the automatic SMS banking forwarding?',
        hint: 'Read the Authorized Forwarding Number from the dealership logs at 11:43 AM.',
        correctKeywords: ['70012-99887', '7001299887'],
        solutionText: '+91-70012-99887 (A burner mobile number used to receive bank OTPs)'
      }
    ]
  },
  {
    id: 'ipdr-leak',
    category: 'ipdr',
    title: 'Case IPDR-201: State Entrance Paper Leak',
    shortDescription: 'Trace server access logs to uncover how a high-security CET entrance exam Chemistry paper was leaked online.',
    difficulty: 'Medium',
    summary: 'Just 12 hours before the competitive Engineering Entrance Exam (CET), the Chemistry paper leaked on social media. Pune Police Cyber Cell points to an internal university server breach.',
    backgroundStory: 'Exam paper PDFs are stored in encrypted subfolders on the central university computer network. Cyber Analyst Inspector Anand Rathi needs you to cross-verify the server access IPDR logs to find the local IP that downloaded the paper before its official release.',
    objective: 'Examine server traffic, extract file retrieval directories, match file size hashes, and identify the culprit subnet IP.',
    evidenceFiles: [
      {
        name: 'university_server_access_log.csv',
        size: '15 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Server access registers recording incoming IP requests, HTTP methods, exfiltration volume, and browser headers.'
      },
      {
        name: 'cet_exam_file_manifest.txt',
        size: '4 KB',
        type: 'TXT',
        category: 'IPDR',
        description: 'Targeted file blueprints detail, including byte size, checksums, and folder directory path.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'Which local IP address initiated the GET download for "security_exam_final.pdf"?',
        hint: 'Search the university access logs for the file "security_exam_final.pdf" with status code 200.',
        correctKeywords: ['192.168.42.115'],
        solutionText: '192.168.42.115 (A computer terminal inside the university senior library)'
      },
      {
        id: 'q2',
        question: 'What is the exact timestamp (HH:MM:SS) when the leak download was completed?',
        hint: 'Find the entry timestamp on college records corresponding to the CET chemistry paper GET request.',
        correctKeywords: ['03:14:22', '031422'],
        solutionText: '03:14:22 AM (Well before the early morning scheduled paper printing times)'
      },
      {
        id: 'q3',
        question: 'What is the file size in bytes of the exfiltrated exam PDF?',
        hint: 'Examine the exam_file_manifest.txt or byte transfer volume for that specific download.',
        correctKeywords: ['4194304'],
        solutionText: '4194304 bytes (Exactly 4 Megabytes)'
      },
      {
        id: 'q4',
        question: 'What specific command line client terminal or software tool was used to retrieve the file?',
        hint: 'Check the Client_User_Agent column on the download entry row.',
        correctKeywords: ['curl/7.88.1', 'curl'],
        solutionText: 'curl/7.88.1 (Proves the file download was scripted from a terminal command-line prompt, not a standard browser)'
      },
      {
        id: 'q5',
        question: 'Which proxy service node IP was used to route the leaked paper onto the public internet?',
        hint: 'Trace outbound gateway hops executed immediately after the primary file download.',
        correctKeywords: ['185.220.101.5'],
        solutionText: '185.220.101.5 (A known Tor exit gateway IP)'
      }
    ]
  },
  {
    id: 'ipdr-espionage',
    category: 'ipdr',
    title: 'Case IPDR-202: Hyderabad EV Design Espionage',
    shortDescription: 'Trace corporate design theft in Gachibowli by correlating internal host logins with abnormal outgoing uploads.',
    difficulty: 'Hard',
    summary: 'A leading Electric Vehicle company in Gachibowli, Hyderabad, discovered that their high-capacity battery system master blueprints were stolen and sold to an international competitor.',
    backgroundStory: 'No external hacks were recorded on firewalls, suggesting an inside helper threat. Cyberabad Cyber Police Division has retrieved local downloads and firewall egress NAT entries to cross-verify large transfers.',
    objective: 'Match server accesses, find the internal laptop IP, trace foreign server ports, and assess the volume of data lost.',
    evidenceFiles: [
      {
        name: 'blueprint_server_downloads.csv',
        size: '22 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Server access logs from the secure R&D lab holding mechanical blueprints.'
      },
      {
        name: 'gateway_nat_traffic_log.csv',
        size: '24 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Firewall IPDR database logging outbound server connections, destination countries, protocols, and sizes.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'What internal computer IP address initiated the massive file download from the blueprints server?',
        hint: 'Lookup the blueprints server retrieve records and sort by download bytes in descending order.',
        correctKeywords: ['10.10.12.85'],
        solutionText: '10.10.12.85'
      },
      {
        id: 'q2',
        question: 'What external recipient IP received the subsequent large data upload?',
        hint: 'Match outgoing connections from 10.10.12.85 to find the external ip capturing gigabytes.',
        correctKeywords: ['45.79.120.33'],
        solutionText: '45.79.120.33 (A VPS server located overseas)'
      },
      {
        id: 'q3',
        question: 'Which standard protocol terminal port (SFTP) was used to transfer the files?',
        hint: 'Examine the port number associated with the high-transfer connection.',
        correctKeywords: ['22'],
        solutionText: 'Port 22 (Secure File Transfer Protocol - SFTP)'
      },
      {
        id: 'q4',
        question: 'What was the total volume of data (in Megabytes) uploaded during that single session?',
        hint: 'Read the total MB transfer metadata logged for the transfer socket.',
        correctKeywords: ['812'],
        solutionText: '812 Megabytes (Equivalent to the entire compressed blueprint folder)'
      },
      {
        id: 'q5',
        question: 'What is the exact disconnection timestamp (HH:MM:SS) of the outgoing communication socket?',
        hint: 'Identify the final status row showing SOCKET_CLOSED_OK to read the time.',
        correctKeywords: ['16:45:12', '164512'],
        solutionText: '16:45:12'
      }
    ]
  },
  {
    id: 'ipdr-stalking',
    category: 'ipdr',
    title: 'Case IPDR-203: Udaipur Cyber Stalking Investigation',
    shortDescription: 'Unmask a stalker by mapping failed password resets against residential broadband IPs.',
    difficulty: 'Medium',
    summary: 'A lifestyle influencer from Udaipur, Rajasthan, reported receiving continuous threats online. In addition, there were multiple suspicious attempts to gain access to her personal email and social profiles.',
    backgroundStory: 'Rajasthan Cyber Police collected portal logs capturing failed email-reset attempts. By grouping these anomalous attempts, we can locate the suspect\'s residential internet block in Delhi.',
    objective: 'Group IP registries, determine ISP ownership, count failed logins, and locate the suspect\'s city region.',
    evidenceFiles: [
      {
        name: 'failed_password_reset_logs.csv',
        size: '14 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Influencer security logs detailing date, time, client IP, reset state, and operating system.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'Which specific client IP address triggered the highest count of failed password resets?',
        hint: 'Count the occurrences of Each client IP inside failed_password_reset_logs.csv.',
        correctKeywords: ['198.51.100.222'],
        solutionText: '198.51.100.222'
      },
      {
        id: 'q2',
        question: 'What is the name of the internet service provider (ISP) hosting this offender IP?',
        hint: 'Scan the ISP or Provider header next to the IP.',
        correctKeywords: ['excelsior_comms', 'excelsior'],
        solutionText: 'Excelsior_Comms'
      },
      {
        id: 'q3',
        question: 'How many total failed password reset attempts were placed from this rogue IP?',
        hint: 'Count the total records linked to the IP 198.51.100.222.',
        correctKeywords: ['47'],
        solutionText: '47 failed attempts'
      },
      {
        id: 'q4',
        question: 'Which operating system platform (OS) was running on the stalker\'s hacking terminal?',
        hint: 'Check the Platform OS column associated with the stalker IP.',
        correctKeywords: ['android_os', 'android'],
        solutionText: 'Android_OS'
      },
      {
        id: 'q5',
        question: 'What geographic city region (e.g., Delhi suburb) did the ISP route this IP address connection through?',
        hint: 'Lookup the city zone under Geo_Sector column next to the IP.',
        correctKeywords: ['north_delhi', 'delhi'],
        solutionText: 'North_Delhi'
      }
    ]
  },
  {
    id: 'ipdr-crypto',
    category: 'ipdr',
    title: 'Case IPDR-204: Noida Crypto Wallet Phishing Heist',
    shortDescription: 'Trace routing paths and exfiltration endpoints in Noida to solve a high-value crypto-wallet drain.',
    difficulty: 'Medium',
    summary: 'A resident of Noida Sector 62 fell victim to a fake "free crypto bonus" scam link, which instantly drained 15 Ethereum ($42,000) from his MetaMask browser extension.',
    backgroundStory: 'Up Police Cyber Station Sector 36 investigated the victim\'s DNS resolutions and browser history logs. When the user entered his secret 12-word seed phrase, a background script immediately sent the keys to an offshore hacking server. Let\'s find where the keys went.',
    objective: 'Identify fake domains, discover target server IPs, trace key-harvesting API paths, and locate owner country information.',
    evidenceFiles: [
      {
        name: 'malcontent_phishing_network_trace.csv',
        size: '16 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Packet capture detailing outgoing POST requests, DNS lookups, and connection response speeds.'
      },
      {
        name: 'phishing_domain_whois_record.txt',
        size: '5 KB',
        type: 'TXT',
        category: 'IPDR',
        description: 'Public domain WHOIS file containing registry dates, server locations, and host companies.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'What was the specific fake domain URL resolved during the phishing redirect?',
        hint: 'Look for DNS resolution logs inside malcontent_phishing_network_trace.csv.',
        correctKeywords: ['secure-ledger-login.org', 'secure-ledger'],
        solutionText: 'secure-ledger-login.org'
      },
      {
        id: 'q2',
        question: 'What is the server IP address hosting this fake, malicious phishing portal?',
        hint: 'Match the target IP address associated with the secure-ledger DNS result.',
        correctKeywords: ['185.112.144.90'],
        solutionText: '185.112.144.90'
      },
      {
        id: 'q3',
        question: 'What was the exact REST API endpoint directory path that received the stolen wallet codes?',
        hint: 'Search for the URI directory listed under the POST exfiltration row.',
        correctKeywords: ['/api/v1/harvest/keys', 'harvest/keys'],
        solutionText: '/api/v1/harvest/keys'
      },
      {
        id: 'q4',
        question: 'What was the latency in milliseconds for this data exfiltration connection to complete?',
        hint: 'Read the Latency_Ms column value next to the POST request.',
        correctKeywords: ['340'],
        solutionText: '340 milliseconds'
      },
      {
        id: 'q5',
        question: 'Which foreign country is listed as the host registry location for the exfiltration server IP?',
        hint: 'Open phishing_domain_whois_record.txt and search for the IP Owner Country line.',
        correctKeywords: ['russia'],
        solutionText: 'Russia'
      }
    ]
  },
  {
    id: 'ipdr-terror',
    category: 'ipdr',
    title: 'Case IPDR-205: Border-Sect Sleeper Cell Coordination',
    shortDescription: 'Parse internet routing details in Jammu & Kashmir to locate an encrypted coordination portal.',
    difficulty: 'Hard',
    summary: 'A national investigation busted a sleeper cell. The seized smartphones showed that the members were using stealth network routes to access a secure, hidden chat page.',
    backgroundStory: 'Special agents of the National Investigation Agency (NIA) retrieved raw web-routing telemetry. The group used high-encryption proxy bridges to avoid surveillance. Analyze the IPDR packet transfer rates and port directories to pinpoint the main proxy node.',
    objective: 'Analyze encrypted protocol indicators, trace gateway bridge IPs, find port registers, and list transaction sizes.',
    evidenceFiles: [
      {
        name: 'sleeper_agent_network_ipdr.csv',
        size: '22 KB',
        type: 'CSV',
        category: 'IPDR',
        description: 'Network data logs tracking continuous TCP socket connection flows, active ports, packet sizes, and durations.'
      },
      {
        name: 'bridge_relay_routing_nodes.txt',
        size: '7 KB',
        type: 'TXT',
        category: 'IPDR',
        description: 'National directory mapping proxy node statuses, relay names, and backup networks.'
      }
    ],
    investigationQuestions: [
      {
        id: 'q1',
        question: 'What is the primary computer IP address used as the gateway/bridge node for the hidden chat page?',
        hint: 'Locate the IPDR row featuring the longest-lived outgoing connection with high data volumes.',
        correctKeywords: ['198.51.100.81'],
        solutionText: '198.51.100.81'
      },
      {
        id: 'q2',
        question: 'Which protocol port did the suspects use to initiate their encrypted chat sessions?',
        hint: 'Find the Destination-Port column matching the primary bridge IP 198.51.100.81.',
        correctKeywords: ['9001'],
        solutionText: 'Port 9001 (A common Tor relay entry port service)'
      },
      {
        id: 'q3',
        question: 'What is the secondary backup IP address triggered automatically after the primary link disconnected?',
        hint: 'Search for the backup proxy mentioned in bridge_relay_routing_nodes.txt or downstream logs.',
        correctKeywords: ['203.0.113.155'],
        solutionText: '203.0.113.155 (The failover gateway relay)'
      },
      {
        id: 'q4',
        question: 'What was the overall volume of data packets (in Kilobytes) transfered during the primary session?',
        hint: 'Read the Payload_KB column value next to the active bridge connection.',
        correctKeywords: ['18420'],
        solutionText: '18420 KB'
      },
      {
        id: 'q5',
        question: 'Which specific high-level TLS socket security standard was negotiated for the session handshake?',
        hint: 'Look up the handshake or encryption standard mentioned under connection metadata.',
        correctKeywords: ['tlsv1.3', '1.3'],
        solutionText: 'TLSv1.3 (Ensures state-of-the-art secure transmission)'
      }
    ]
  }
];
