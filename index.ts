const fs = require("fs");
const pg = require("pg");
const url = require("url");

const config = {
  user: "avnadmin",
  password: "AVNS_S848flPKhaIAuuAI46J",
  host: "practise1-project-postgres-dev-usorfaitheloho-2f87.j.aivencloud.com",
  port: 18134,
  database: "defaultdb",
  ssl: {
    rejectUnauthorized: true,
    ca: `-----BEGIN CERTIFICATE-----
MIIEUDCCArigAwIBAgIUfMogPHx58/ygWUmW2ynPfjWDKC4wDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1NDFjMjU1ZDEtMjliMy00ZGVjLWFmNTYtM2IxNmU1MGEy
NmQ0IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNzIxMDgzMzIwWhcNMzUwNzE5MDgz
MzIwWjBAMT4wPAYDVQQDDDU0MWMyNTVkMS0yOWIzLTRkZWMtYWY1Ni0zYjE2ZTUw
YTI2ZDQgR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAK7UnYQfEL4KRsHvhAlZcg5VhHE/01j+BhgvDaN7PbLnD9WD0+Fo2Ghg
dAg9ab9U5Bxp2LgmBNgUlg3QZhIW/TAWsExpHweZBhSXgI0RIuvulKuWcKVDbOLO
IobY1c/Ef8EZqXpFwQIOwYIDyUAghGrJPFn+J0wlmEblXPpuKgASiKq9s5fgCf/P
/wNiJ/zN/+PaWZizL5H1h1yrA0whAOJ1wi9dRBgrPnnHm6aATCYs2DOPEnWUegAQ
eVNb2rTUk1tX3lGUqS1sSQ9oHGKenj38mNDCYguzd9uMzjxqkZLl46tYY+9bIVPO
5hJtIjESZrMuUA2EKdpXgCKQBaFjymAPLvOZhwqxeqERDGZsNNqCoigqu5mbpUGz
oPJWi+bvx2Vgx7Jy9CqhyDQP9+hCSLvs2CahhSE5kutl4bywILO/V/KNLgsUFJHl
l58sczwd5SHpyvl6uQlXpi+F7Iw2fLSL2E5ZdZ8IiHQA9Z/PRWOwHgozgN6YIkyB
JdamEl4VDwIDAQABo0IwQDAdBgNVHQ4EFgQUqCx+PCu10H6DcxfkxEhmNZOHMBAw
EgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD
ggGBABzqnD9qZdu9XrAWIAKhvOuLpKCRhM749B7sSn3nlXIdiTBUdf4FZutLLQrM
GTdPqHA5mIAH/bp0v+olTHdNJtY7TOfJeauC+/s0ZKHSCEptkQzD7w0d796Vs9t1
0jFgd2nbfUpgUD49TSyMmsEE0Mh/IM591HRTUzGWejmxe3TOqa6Iw/gZCyRCySg4
PsNdfa7VQNi/SDck3p3G1S760Ty4famfTbb/STMv2HG6w888I3EElTp7ufVCikZR
92eO3FBSJm6/qyy7e/vqKLlnA4QtLUhqDmaravoSAGlFiGF8tqNhAhMqKWzAY3xp
CFmYHkF8SV9HwpCALA38kKbhAsGJnvZ02fbgJsW27rHBh+6GmH5yaRBbr9xR7T3w
ZLFFesHbsRBPuvDyVXIix/5+QdfQhG8heXxx1AFmGgiWu3jnbB8aNET/IaBlV866
TfQb5fvWiUo+PKFA8vb4AW9T5mXKPWBC69ys4ul3tTRAcEiehpVb3jXxSxqmiSGH
wL5oaQ==
-----END CERTIFICATE-----`,
  },
};

const client = new pg.Client(config);
client.connect(function (err) {
  if (err) throw err;

  //create a table 
  const createTableQuery = `
CREATE TABLE IF NOT EXISTS test_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

  client.query(createTableQuery,[], function (err){
    if (err) throw err;

    console.log("Table created successfully");
  })

//Query the database version
  client.query("SELECT VERSION()", [], function (err, result) {
    if (err) throw err;

    console.log(result.rows[0].version);
    client.end(function (err) {
      if (err) throw err;
    });
  });
});
