const playListData = [
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 1'},
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 2'},
    {picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
    name: 'Playlist 3'}
  ];
  
  const singerData = [
    {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
    name: 'Ca sĩ 1'},
    {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
    name: 'Ca sĩ 2'},
    {picture: 'https://cdn.voh.com.vn/voh/Image/2018/12/20/113569468787218822010901725631029n2_20181220132032.jpg',
    name: 'Ca sĩ 3'}
  ];
  
  const forYou = [
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'},
    {picture: 'https://i.ytimg.com/vi/j4Jj29mUYS8/maxresdefault.jpg'}
  ];
  
  const topicData = [
    {
      picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQRwfB-qpOCUWGWioAlOxTXOdG2HiIS8Eu2PI_0Lh4GgA_8kFdd&usqp=CAU',
      name: 'Cách mạng'
    },
    {
      picture: 'https://avatar-nct.nixcdn.com/playlist/2017/12/18/b/4/e/e/1513580321142_500.jpg',
      name: 'Nhạc trẻ'
    },
    {
      picture: 'https://znews-photo.zadn.vn/w660/Uploaded/ofh_fdmzsofw/2017_05_17/18403557_754897321354685_5074903081571930249_n.jpg',
      name: 'Bolero'
    },
  ];

  const list = [
    {
      title: 'Danh sách bài hát',
      icon: 'headset',
      type: 'songs',
    },
    {
      title: 'Danh sách yêu thích',
      icon: 'favorite',
      type: 'favorite',
    },
    {
      title: 'Playlist',
      icon: 'queue-music',
      type: 'playlist',
    },
  ]

  const songs = [
    {
      id: 0,
      uri: "https://data20.chiasenhac.com/downloads/2061/5/2060821-946b2223/m4a/Anh%20Thanh%20Nien%20-%20HuyR.m4a",
      picture: 'https://i.ytimg.com/vi/HPL74s4VPdk/maxresdefault.jpg',
      name: 'Anh thanh niên',
      singer: 'HuyR',
      favorite: 0,
      latestListening: 1587917439178,
    },
    { 
      id: 1,
      uri: "https://data19.chiasenhac.com/downloads/2046/5/2045334-677410ec/m4a/Vi%20Yeu%20Cu%20Dam%20Dau%20-%20MIN_%20Den_%20JustaTee.m4a",
      picture: 'https://i.ytimg.com/vi/EWz4fITO5qg/maxresdefault.jpg',
      name: 'Vì yêu cứ đâm đầu',
      singer: 'MIN x ĐEN x JUSTATEE',
      favorite: 1,
      latestListening: 1587267045840,
    },
    {
      id: 2,
      uri: "https://data00.chiasenhac.com/downloads/1840/5/1839053-623da96a/m4a/Mat%20Troi%20Cua%20Em%20-%20Phuong%20Ly_%20JustaTee.m4a",
      picture: 'https://i.ytimg.com/vi/t0WFOnwp3MM/maxresdefault.jpg',
      name: 'Mặt trời của em ',
      singer: 'Phương Ly',
      favorite: 0,
      latestListening: 1587917439178,
    },
    {
      id: 3,
      uri: "https://data00.chiasenhac.com/downloads/1856/5/1855446-4b1d5098/320/Da%20Lo%20Yeu%20Em%20Nhieu%20-%20JustaTee.mp3",
      picture: 'https://i.ytimg.com/vi/KhTCatAKVpk/maxresdefault.jpg',
      name: 'Đã lỡ yêu em nhiều',
      singer: 'JustaTee',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 4,
      uri: "https://data25.chiasenhac.com/downloads/2085/5/2084204-269ba905/m4a/Em%20Khong%20Sai%20Chung%20Ta%20Sai%20-%20ERIK.m4a",
      picture: 'https://data.chiasenhac.com/data/cover/121/120248.jpg',
      name: 'Em không sai chúng ta sai',
      singer: 'Erik',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 5,
      uri: "https://data2.chiasenhac.com/downloads/1705/5/1704778-c7c3427c/m4a/Turn%20It%20Up%20-%20Monstar.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1480912341/v1/album/s2/0/19/94/20019736.jpg?v=1480912341',
      name: 'Turn It Up',
      singer: 'Monstar',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 6,
      uri: "https://data37.chiasenhac.com/downloads/1887/5/1886604-d936f53d/m4a/I_m%20A%20Superman%20Live%20Performance%20Version_.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1500687847/v1/album/s2/0/19/799/20741146.jpg?v=1500687847',
      name: "I'm A Superman",
      singer: 'BAK (Bảo Kun)',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 7,
      uri: "https://data54.chiasenhac.com/downloads/1108/5/1107072-42919719/m4a/Tinh%20Yeu%20Mau%20Nang%20-%20Doan%20Thuy%20Trang_%20Big.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1/v1/artists/s2/0/0/0/729.jpg?v=1',
      name: 'Tình Yêu Màu Nắng',
      singer: 'BigDaddy, Đoàn Thúy Trang',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 8,
      uri: "https://data2.chiasenhac.com/downloads/1699/5/1698220-b2544de6/m4a/Chung%20Ta%20Khong%20Thuoc%20Ve%20Nhau%20-%20Son%20Tung.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1490266502/v1/album/s2/0/19/32/19956023.jpg?v=1490266502',
      name: 'Chúng Ta Không Thuộc Về Nhau',
      singer: 'Sơn Tùng M-TP',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 9,
      uri: "https://data22.chiasenhac.com/downloads/1546/5/1545950-10687abf/m4a/Anh%20Sai%20Roi%20-%20Son%20Tung%20M-TP.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1506414310/v1/album/s2/0/19/738/20679343.jpg?v=1506414310',
      name: 'Anh Sai Rồi',
      singer: 'Sơn Tùng M-TP',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 10,
      uri: "https://data53.chiasenhac.com/downloads/1065/5/1064301-d2e5f10b/320/Con%20Mua%20Ngang%20Qua%20-%20Son%20Tung%20M-TP.mp3",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1504865707/v1/album/s2/0/19/738/20679343.jpg?v=1504865707',
      name: 'Cơn Mưa Ngang Qua',
      singer: 'Sơn Tùng M-TP',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 11,
      uri: "https://data59.chiasenhac.com/downloads/1256/5/1255159-37f990f5/m4a/Thu%20Cuoi%20-%20Yanbi_%20Mr_T_%20Hang%20BingBoong.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1/v1/artists/s2/0/0/0/647.jpg?v=1',
      name: 'Thu Cuối',
      singer: 'Hằng BingBoong, Yanbi, Mr.T',
      favorite: 1,
      latestListening: 1587756992587,
    },
   {
      id: 12,
      uri: "https://data51.chiasenhac.com/downloads/1010/5/1009775-4463bd86/m4a/Dong%20Thoi%20Gian%20-%20Nguyen%20Hai%20Phong.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1/v1/artists/s2/0/0/0/186.jpg?v=1',
      name: 'Dòng Thời Gian',
      singer: 'Nguyễn Hải Phong',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 13,
      uri: "https://data51.chiasenhac.com/downloads/1002/5/1001372-9f61541c/m4a/Tim%20Lai%20Bau%20Troi%20-%20Tuan%20Hung.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1464657580/v1/album/s2/0/0/22/22705.jpg?v=1464657580',
      name: 'Tìm Lại Bầu Trời ',
      singer: 'Tuấn Hưng',
      favorite: 1,
      latestListening: 1587756992587,
    },
    {
      id: 14,
      uri: "https://data51.chiasenhac.com/downloads/1002/5/1001372-9f61541c/m4a/Tim%20Lai%20Bau%20Troi%20-%20Tuan%20Hung.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1492072708/v1/album/s2/0/0/24/24703.jpg?v=1492072708',
      name: 'Độc Thoại ',
      singer: 'Tuấn Hưng',
      favorite: 0,
      latestListening: 1587917439178,
    },
  
   {
      id: 15,
      uri: "https://data53.chiasenhac.com/downloads/1088/5/1087977-edbad9ee/m4a/Tru%20Mua%20-%20HKT.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1480391600/v1/album/s2/0/0/22/23263.jpg?v=1480391600',
      name: 'Trú Mưa ',
      singer: 'HKT',
      favorite: 0,
      latestListening: 1587917439178,
    },
  
   {
      id: 16,
      uri: "https://data54.chiasenhac.com/downloads/1095/5/1094479-683e8b74/m4a/Mua%20Cua%20Ngay%20Xua%20-%20Ho%20Quang%20Hieu.m4a",
      picture: 'https://109cdf7de.vws.vegacdn.vn/kv0puCNE4oNNfn7YhOpK/1505443804/v1/album/s2/0/0/28/29472.jpg?v=1505443804',
      name: 'Mưa Của Ngày Xưa ',
      singer: 'Hồ Quang Hiếu',
      favorite: 0,
      latestListening: 1587917439178,
    },
  ]
  
  const user = {
    id: 0,
    avatar: "https://cdn2.vectorstock.com/i/1000x1000/10/86/music-equaliser-wave-vector-171086.jpg",
    username: 'ruong',
    fullname: 'NTR',
    createdAt: 1587917439178
  }

  export {playListData, singerData, topicData, forYou, list, songs, user}