import { BadGatewayException, HttpService, Injectable } from '@nestjs/common';
import { Method } from 'axios';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {
  }

  public async request<T>(method: Method, url: string, body?: any): Promise<{ data: T; status: number }> {
    const data = ['patch', 'post', 'put'].includes(method.toLowerCase()) ? body : undefined;

    const res = await this.httpService.request<T>({
      data,
      method,
      url,
    }).toPromise()
        .catch((error) => {
          if (error.response) {
            return error.response;
          } else {
            throw new BadGatewayException();
          }
        });

    return {
      data: res.data,
      status: res.status,
    };
  }
}
