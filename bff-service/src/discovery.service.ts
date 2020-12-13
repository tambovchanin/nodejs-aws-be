import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscoveryService {
  constructor(private readonly configService: ConfigService) {
  }

  public getServiceUrl(serviceName: string): string {
    const key = `${serviceName.toUpperCase()}_SERVICE_URL`;

    const serviceUrl = this.configService.get(key);

    if (!serviceUrl) {
      throw new BadGatewayException(`Cannot process request for service ${serviceName}`);
    }

    return serviceUrl;
  }

  public discoverEndpoint(path: string): { serviceName: string, servicePath: string, serviceUrl: string, url: string } {
    const [, serviceName, ...rawServicePathParts] = path.split('/');
    const serviceUrl = this.getServiceUrl(serviceName);
    const servicePathParts = rawServicePathParts.filter(part => part !== '');
    const servicePath = servicePathParts.length > 0 ? `/${servicePathParts.join('/')}` : '';

    return {
      serviceName,
      servicePath,
      serviceUrl,
      url: serviceUrl + servicePath,
    };
  }
}
