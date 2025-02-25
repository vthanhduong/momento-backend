// Add Express
const express = require("express");
require('dotenv').config();
// Initialize Express
const app = express();
const mysql = require('mysql2');
const userRoute = require('./routes/user.route');

const config = {
  host: 'mysql-2693884f-test-vtd.l.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_SRIl5l0gPcw1S4LxMgY',
  database: 'defaultdb',
  port: '15285',
  ssl: {
    rejectUnauthorized: false,
    ca: `-----BEGIN CERTIFICATE-----
    MIIETTCCArWgAwIBAgIUSDrPeHJtoJUV6yv9Pn/K+npxFdMwDQYJKoZIhvcNAQEM
    BQAwQDE+MDwGA1UEAww1MmVhOTc3OTctMWEyNC00YjgxLTg5N2UtNTdhOTc0OGE0
    ZGFiIEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwMjIxMDI1ODE0WhcNMzUwMjE5MDI1
    ODE0WjBAMT4wPAYDVQQDDDUyZWE5Nzc5Ny0xYTI0LTRiODEtODk3ZS01N2E5NzQ4
    YTRkYWIgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
    AYoCggGBAJhMla0rnA1B1CRLGucr1T1rwxjlTT9hRXs0fgBTd11qyEYYNtm6/6Xp
    mD4u844x8vgK8nKrVumEhN8rF8eXPN7n6PNzgabmvPO73i/0ixAnhrAO6Iarex4L
    uFR+sp2gBukMTxUyid8vOohFzND6RO6oE93d4w5Pa0Hh/pL9cM+4I/bdvKkXsu05
    VFBFsY5IJP6sf23eoRkSGfBt1Zrpi4D9rh+NjRoiwLWpU1hD5jq5LBUZIEkPJ+rf
    OZt0+i36gOLv9nvj59IpnYhYJFubNu5F+6c9aexQt37of6XVL9FwHdrJ8+ky4c1k
    UEAh/PP4jxlqq/c5AiRu9VPg4GVqKKVc7KJZomqNGz1cvwaTIcIHE37JbrPWiweE
    C3KebXY9WqiFZN2YYAndE118a6fKG/+siAmoMeh6dzHcTjanfVQdrIHeBP487dxe
    gKM9PS6Hy3dpeag9kFfogjXxdxeZsFtT8eeVr7CVbZuT1sWfaBYyNW1HiNobEKUX
    LKEHoDNVWwIDAQABoz8wPTAdBgNVHQ4EFgQUl3JhwsYE1VyhxSQ3MN/Ost9cm64w
    DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
    AEXl/zXd3IPtQw0RZCsAvuNfb0VKPOLoIIf4i1yREt1FAvpuswFgvNP1Y63PhI3a
    oG0bvZJNMOz2PKAO/xUsX2/jI1qrglWcuRilB+bHyYWZ1pQBGq2S7TN+RNKOP36w
    GwZYqEGOtD3yItSVNjQQcigKkh1IsoZZ77oJcGuq/4GNzOJhJDdLT9P8Jhc4V6OM
    xwAOO5I2OFu2AK7ie2UwwKj6ZYikesBZ7A0ewovX4SKkvL6YFTnQE50GSyUHH/CN
    P5QNHllE5W7jEpFga7pR4GUBn+97vliZ5eViDnC16gQxyxfIDXjFDv36ZFsoSduE
    OOf6gWf+cxROuZOR5d/tWfMY+ZzafEKCSmPJBuES4HyPtYaTELHvq2qnSV7mYKov
    UndyXG3ztqqXqLaRCCLq7PBm7g6V0sp6Atx4g3zzFB0BjZ91O42EIh99IqMTFmD5
    nEiHbaC/bH3AXyn2y+qFIA4szajShbRfVK0cpKg95iTcMevUNvRpbY1jBuU4IWAS
    TA==
    -----END CERTIFICATE-----`,
  },
};



// Create GET request
app.get("/", (req, res) => {
  var data = '';
  const conn = mysql.createConnection(config);
  conn.execute('SELECT VERSION() AS version', [], (err, result) => {
    if (err) throw err;
    data = result[0].version;
  });
conn.end();
  res.status(400).json({
    status: "success",
    message: data,
  })
});

app.use('/user', userRoute);

// Initialize server
app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;