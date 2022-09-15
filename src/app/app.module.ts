import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login/login-page.component';
import { AngularMaterialModule } from './shared/angular-material.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AngularMaterialModule,
    AppRoutingModule,    
    ToastrModule.forRoot(),
  ],
  exports: [
    AngularMaterialModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
