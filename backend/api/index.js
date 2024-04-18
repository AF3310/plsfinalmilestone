
const express =require('express');
const mysql=require('mysql2')
const cors=require('cors')

const app=express()
app.use(cors())
app.use(express.json()); 

const db = mysql.createConnection({
  host: "mysql-database-milestonefinal-af.alwaysdata.net",
  user: "356119",
  password: "Ilym3310!",
  database: "database-milestonefinal-af_finalmilestone3",


});

app.get('/',(re,res)=>{
    return res.json("from backend side side");
});
app.get('/data', (req, res) => {
  const email = req.query.email;  
  const sql = `SELECT HRT.Channel, HRT.Frequency,HRT.SatelliteName,HRT.Encryption FROM hostingrelationshiptable HRT 
  INNER JOIN favourites F ON F.ChannelName = HRT.Channel 
  INNER JOIN user U ON U.email = F.email 
  WHERE U.email = ?
  AND HRT.longitudeValue >= U.coordinates - 10 
  AND HRT.longitudeValue <= U.coordinates + 10
  AND HRT.longitudeChar= U.direction`;

  
  db.query(sql, [email], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    console.log(result)
    return res.status(200).json(result);
  });
});
app.get('/users',(req,res)=>{
    const sql="SELECT * FROM CHANNELS"
    db.query(sql,(err,data)=>{
        if (err) return res.json(err);
        return res.json(data);
        
    })
})
app.get('/users2', (req, res) => {
  const { latitude, direction } = req.query;
  
  let sql = "SELECT Channel,Position FROM hostingrelationshiptable WHERE longitudeValue > ? AND longitudeValue < ?";
  

  if (direction === 'E') {
    sql += " AND longitudeChar = 'E'";
  } else if (direction === 'W') {
    sql += " AND longitudeChar = 'W'";
  } else   {
    return res.status(400).json({ error: 'Invalid direction provided' });
  }
  upperb=parseInt(latitude)+10;
  lowerb=parseInt(latitude)-10;
  //console.log(upperb)
 // console.log(lowerb)
  db.query(sql, [lowerb,upperb], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
    return res.status(200).json(result);
  });
});



app.get('/topNetworkProviders', (req, res) => {
  const sql = `SELECT channels.NetworkProvider, COUNT(*) AS ChannelCount
               FROM channels
               WHERE NetworkProvider IS NOT NULL
               GROUP BY NetworkProvider
               ORDER BY COUNT(*) DESC
               LIMIT 5`;
  db.query(sql, (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred while fetching data.' });
      } else {
          res.status(200).json(data);
      }
  });
});

app.post('/addUser', (req, res) => {
  const { username, email, bday, gender, location, region, coordinates, direction } = req.body;
  const sql = "INSERT INTO user (username, email, bday, Gender, location, Region, coordinates, direction) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [username, email, bday, gender, location, region, coordinates, direction];
  
  db.query(sql, values, (err, result) => {
      if (err) {
          console.error('Error:', err);
          return res.status(500).json({ error: 'An error occurred while adding user.' });
      }
      return res.status(200).json({ message: "User added successfully", affectedRows: result.affectedRows });
  });
});

app.post('/addFavourites', (req, res) => {
  const { channels, email } = req.body;

  // Check if channels and email are provided
  if (!channels || !email) {
    return res.status(400).json({ error: 'Channels and email are required.' });
  }

  const channelList = channels.split(',').map(channel => [channel.trim(), email]);
  const sql = 'INSERT INTO favourites (ChannelName, email) VALUES ?';

  db.query(sql, [channelList], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: 'An error occurred while adding the favourites.' });
    }
    res.status(200).json({ message: 'Favourites added successfully.' });
  });
});



app.get('/topRocketLaunches', (req, res) => {
    const sql = `
    SELECT LaunchingRocket, COUNT(*) AS RocketCount 
    FROM satellites
    WHERE LaunchingRocket IS NOT NULL
    GROUP BY LaunchingRocket
    ORDER BY RocketCount DESC
    LIMIT 5
    `;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching data from the database.' });
      } else {
        res.status(200).json(result);
      }
    });
  });
  app.get('/topChannels', (req, res) => {
    const sql = `
    SELECT Lang, Channel, SatelliteCount
    FROM (
        SELECT 
            Lang,
            Channel,
            COUNT(*) AS SatelliteCount,
            ROW_NUMBER() OVER (PARTITION BY Lang ORDER BY COUNT(*) DESC) AS RowNumber
        FROM 
            channels C
        INNER JOIN 
            hostingrelationshiptable HRT ON C.ChannelName = HRT.Channel
        WHERE 
            Lang IS NOT NULL AND Channel IS NOT NULL
        GROUP BY 
            Lang, Channel
    ) AS RankedChannels
    WHERE 
        RowNumber <= 5
    ORDER BY 
        Lang, SatelliteCount DESC
    `;
    
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching top channels.' });
        } else {
            res.status(200).json(result);
        }
    });
});
app.post('/getChannelsByRegion', (req, res) => {
    const { region } = req.body;
    const sql = `SELECT HRT.Channel, s.region 
                 FROM hostingrelationshiptable HRT
                 INNER JOIN satellites s ON s.SatelliteName = HRT.satellitename
                 WHERE s.region = ?`;
    db.query(sql, [region], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching channels by region.' });
      } else {
        res.status(200).json(results);
      }
    });
  });
  app.post('/channelsByHDSDFilter', (req, res) => {
    const { hdsd } = req.body;
    const sql = `SELECT * FROM channelsnew C WHERE C.hdsd = ?`;
    db.query(sql, [hdsd], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        } else {
            res.status(200).json(result);
        }
    });
});



app.post('/channelsByLanguageFilter', (req, res) => {
    const { lang } = req.body;
    const sql = `SELECT * FROM channelsnew C 
                 INNER JOIN hostingrelationshiptable HRT 
                 ON C.channelname = HRT.channel 
                 WHERE lang = ?`;
    db.query(sql, [lang], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        } else {
            res.status(200).json(result);
        }
    });
});

  app.post('/satelliteFilter', (req, res) => {

    const { satelliteName } = req.body;
    console.log(satelliteName)
    const sql = `SELECT HRT.Channel, s.region 
                 FROM hostingrelationshiptable HRT  
                 INNER JOIN satellites s
                 ON s.SatelliteName = HRT.satellitename
                 WHERE s.SatelliteName = ?`;
    db.query(sql, [satelliteName], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
      } else {
        
        console.log(result)
        res.status(200).json(result);
      }
    });
  });

  app.get('/topGrowingSatellites', (req, res) => {

    const sqlQuery = `
    SELECT
    HRT.SatelliteName,
    S.LaunchingDate,
    COUNT(DISTINCT HRT.Channel) AS channel_count,
    YEAR(CURDATE()) - YEAR(S.LaunchingDate) AS years_since_launch,
    COUNT(DISTINCT HRT.Channel) / (YEAR(CURDATE()) - YEAR(S.LaunchingDate)) AS growth_rate
FROM 
    hostingrelationshiptable HRT
INNER JOIN
    satellites S ON HRT.SatelliteName = S.SatelliteName AND HRT.Position = S.Position
GROUP BY
    HRT.SatelliteName,
    S.LaunchingDate
ORDER BY
    growth_rate DESC
LIMIT 5;

    `;

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
            return;
        }
        res.json(result);
    });
});

app.get('/topNetworkProviders2', (req, res) => {
    const sql = `SELECT C.NetworkProvider, CAST(AVG(DISTINCT HRS.satellite_count) AS DECIMAL(10, 4))AS average_satellite_count
                 FROM channels C
                 INNER JOIN (
                   SELECT Channel, COUNT(DISTINCT SatelliteName) AS satellite_count
                   FROM hostingrelationshiptable
                   GROUP BY Channel
                 ) AS HRS ON C.ChannelName = HRS.Channel
                 WHERE C.NetworkProvider IS NOT NULL
                 GROUP BY C.NetworkProvider
                 ORDER BY average_satellite_count DESC
                 LIMIT 5`;
  
    db.query(sql, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
        return;
      }
      res.json(result);
    });});

    
app.listen(8081,()=>{
console.log("listening");
})