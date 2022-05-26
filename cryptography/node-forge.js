// https://www.npmjs.com/package/node-forge#x509
const forge = require('node-forge');

const { pki } = forge;
const pem = '-----BEGIN PKCS7-----\r\n'
    + 'MIAGCSqGSIb3DQEHAqCAMIACAQExDzANBglghkgBZQMEAgEFADCABgkqhkiG9w0BBwGggCSABIHReyJ0eElkIjoiMDg4MmQ5NjNmYy0xNzNmLTRkNDYtODM4MC01NDdjZGU2ZmVlYzQiLCJkYXRhIjoiNjBmNjVjMGY5N2FmZTE2NWNhNWQxMzZlIiwiZGVzYyI6Ilt7XCLsmpTssq3qtazrtoRcIjpcIuyghOyekOyEnOuqhVwifSx7XCLsmpTssq3quLDqtIBcIjpcIuydtO2PvOybjeyKpCDsnITrk5zsi7jsnbhcIn0se1wi67Cb64qU7J20XCI6XCLsi6Drj5nrr7xcIn1dIn0AAAAAAACggDCCAhgwggG/oAMCAQICEGk2xIkNuEcxiri4E+Hd65kwCgYIKoZIzj0EAwIwPjEOMAwGA1UEAxMFS0FLQU8xDzANBgNVBAsTBldBTExFVDEOMAwGA1UEChMFS0FLQU8xCzAJBgNVBAYTAktSMB4XDTIxMDcyMTE1MDAwMFoXDTIzMDcyMTE0NTk1OVowgYQxCzAJBgNVBAYTAktSMQ4wDAYDVQQKDAVLQUtBTzEPMA0GA1UECwwGV0FMTEVUMUAwPgYKCZImiZPyLGQBAQww7Iug64+Z66+8MTM5ODUzMzA5Nzk4NTYzNzExMjA4ODUwOTk0ODk0NjE1NzM1MTkzMRIwEAYDVQQDDAnsi6Drj5nrr7wwWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARF984mp2xOn1HuMkGWgcGqNbtdWi2Q4a8pnWHtW3IgqdqGXfoDeQWX9L+73AczouMcvCJHEwj+qYelYjmOcARuo1gwVjAJBgNVHRMEAjAAMA4GA1UdDwEB/wQEAwIHgDA5BggrBgEFBQcBAQQtMCswKQYIKwYBBQUHMAGGHWh0dHA6Ly9rcC1jZXJ0Lmtha2FvLmNvbS9vY3NwMAoGCCqGSM49BAMCA0cAMEQCIC4hWb6g7oOy14/8WepKq3YDDJz7AknpcRMtw6B/xGbvAiBOrvZ9tsGPM0pUDJHUOfoUZRegbmfQHti30xnoF+EuGQAAMYG9MIG6AgEBMFIwPjEOMAwGA1UEAxMFS0FLQU8xDzANBgNVBAsTBldBTExFVDEOMAwGA1UEChMFS0FLQU8xCzAJBgNVBAYTAktSAhBpNsSJDbhHMYq4uBPh3euZMA0GCWCGSAFlAwQCAQUAMAoGCCqGSM49BAMCBEYwRAIgaS4umL+o8nv1meIAJUVICFnMJi8n/VfeDcpzGeKeEKoCIHa63Zi+MGab4sKxC+sL3TbGx7xkgNkOJTYVkck2Xk4LAAAAAAAA'
    + '\r\n-----END PKCS7-----';
const p7 = forge.pkcs7.messageFromPem(pem);
console.log(p7);

// // generate a keypair and create an X.509v3 certificate
// const keys = pki.rsa.generateKeyPair(2048);
// const cert = pki.createCertificate();
// cert.publicKey = keys.publicKey;
// // alternatively set public key from a csr
// // cert.publicKey = csr.publicKey;
// // NOTE: serialNumber is the hex encoded value of an ASN.1 INTEGER.
// // Conforming CAs should ensure serialNumber is:
// // - no more than 20 octets
// // - non-negative (prefix a '00' if your value starts with a '1' bit)
// cert.serialNumber = '01';
// cert.validity.notBefore = new Date();
// cert.validity.notAfter = new Date();
// cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
// const attrs = [{
//   name: 'commonName',
//   value: 'example.org',
// }, {
//   name: 'countryName',
//   value: 'US',
// }, {
//   shortName: 'ST',
//   value: 'Virginia',
// }, {
//   name: 'localityName',
//   value: 'Blacksburg',
// }, {
//   name: 'organizationName',
//   value: 'Test',
// }, {
//   shortName: 'OU',
//   value: 'Test',
// }];
// cert.setSubject(attrs);
// // alternatively set subject from a csr
// // cert.setSubject(csr.subject.attributes);
// cert.setIssuer(attrs);
// cert.setExtensions([{
//   name: 'basicConstraints',
//   cA: true,
// }, {
//   name: 'keyUsage',
//   keyCertSign: true,
//   digitalSignature: true,
//   nonRepudiation: true,
//   keyEncipherment: true,
//   dataEncipherment: true,
// }, {
//   name: 'extKeyUsage',
//   serverAuth: true,
//   clientAuth: true,
//   codeSigning: true,
//   emailProtection: true,
//   timeStamping: true,
// }, {
//   name: 'nsCertType',
//   client: true,
//   server: true,
//   email: true,
//   objsign: true,
//   sslCA: true,
//   emailCA: true,
//   objCA: true,
// }, {
//   name: 'subjectAltName',
//   altNames: [{
//     type: 6, // URI
//     value: 'http://example.org/webid#me',
//   }, {
//     type: 7, // IP
//     ip: '127.0.0.1',
//   }],
// }, {
//   name: 'subjectKeyIdentifier',
// }]);
// /* alternatively set extensions from a csr
// var extensions = csr.getAttribute({name: 'extensionRequest'}).extensions;
// // optionally add more extensions
// extensions.push.apply(extensions, [{
//   name: 'basicConstraints',
//   cA: true
// }, {
//   name: 'keyUsage',
//   keyCertSign: true,
//   digitalSignature: true,
//   nonRepudiation: true,
//   keyEncipherment: true,
//   dataEncipherment: true
// }]);
// cert.setExtensions(extensions);
// */
// // self-sign certificate
// cert.sign(keys.privateKey);
// console.log(pki.privateKeyToPem(keys.privateKey));
//
// // convert a Forge certificate to PEM
// const pem = pki.certificateToPem(cert);
// console.log(pem);
// //
// // // convert a Forge certificate from PEM
// // var cert = pki.certificateFromPem(pem);
// //
// // // convert an ASN.1 X.509x3 object to a Forge certificate
// // var cert = pki.certificateFromAsn1(obj);
// //
// // // convert a Forge certificate to an ASN.1 X.509v3 object
// // var asn1Cert = pki.certificateToAsn1(cert);
