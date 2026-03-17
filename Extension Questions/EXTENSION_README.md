**Answers**

1: Schema file (.json or .graphql) from Question 1

https://github.com/syliow/url_shortener_coingecko_test/blob/extension-1-questions/Extension%20Questions/uniswap_graphql_schema.json

2: cURL command for Question 2

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV' \
  --data '{"query":"query Get100Pools{\n  pools(first: 100) {\n    id\n    token0 {\n      id\n      symbol\n    }\n    token1 {\n      id\n      symbol\n    }\n  }\n}","operationName":"Get100Pools"}'
```

3: cURL command for Question 3

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV' \
  --data '{"query":"query GetTop100HighestLiquidityPools {\n  pools(\n    first: 100\n    orderBy: liquidity\n    orderDirection: desc\n    where: {createdAtTimestamp_gte: \"1773190800\"}\n  ) {\n    id\n    token0 {\n      id\n      symbol\n    }\n    token1 {\n      id\n      symbol\n    }\n  }\n}","operationName":"GetTop100HighestLiquidityPools"}'
```

4: cURL command for Question 4

```
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://gateway.thegraph.com/api/<YOUR_API_KEY_HERE>/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV' \
  --data '{"query":"query GetUsdcWethPool{\n  pool(id: \"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8\") {\n    id\n    token0 {\n      id\n      symbol\n      derivedETH\n    }\n    token1 {\n      id\n      symbol\n      derivedETH\n    }\n    liquidity\n    token0Price\n    token1Price\n    volumeToken0\n    volumeToken1\n    volumeUSD\n    totalValueLockedUSD\n  }\n}","operationName":"GetUsdcWethPool"}'
```

5: (Optional) Collection export (e.g., Postman .json, Insomnia .yaml, or equivalent from your chosen tool)
https://github.com/syliow/url_shortener_coingecko_test/blob/extension-1-questions/Extension%20Questions/Insomnia_Collection.yaml
