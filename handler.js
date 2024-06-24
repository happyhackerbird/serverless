'use strict';

const { proveIcpPrincipal } = require('@civic/prove-icp-principal')
const { sign } = require('@civic/civic-sign')
const { webcrypto } = require('@peculiar/webcrypto')
const { principal } = require('@dfinity/principal')
const { jwt } = require('did-jwt')

module.exports.hello = async (event) => {
  console.log(proveIcpPrincipal)
  console.log(sign)
  console.log(webcrypto)
  console.log(principal)
  console.log(jwt)

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
