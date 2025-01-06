import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { appRoutingProviders } from './app/app.routes';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ...appRoutingProviders
  ]
}).catch((err) => console.error(err));