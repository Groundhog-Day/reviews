import http from "k6/http";
import { sleep } from "k6";

export default function () {
  let home = Math.floor(Math.random()*9999999);
  http.get('http://localhost:2020/v1/api/' + home + '/accommodation');
  sleep(1);
}