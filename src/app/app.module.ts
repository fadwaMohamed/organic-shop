import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    ShoppingModule,
    CoreModule,
    SharedModule,
    AdminModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    { provide: PERSISTENCE, useValue: 'local' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
