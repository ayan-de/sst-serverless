import { Resource } from 'sst';
import { Example } from '@sst-serverless/core/example';

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
