import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragScrollModule } from 'ngx-drag-scroll';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { CartComponent } from './components/cart/cart.component';
import { CarouselComponent } from './components/main/carousel/carousel.component';
import { ProductComponent } from './components/main/product/product.component';
import { ProductListComponent } from './components/main/product/product-list/product-list.component';
import { SigninComponent } from './components/login/signin/signin.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { ItemListComponent } from './components/cart/item-list/item-list.component';
import { ItemViewComponent } from './components/cart/item-list/item-view/item-view.component';
import { SearchbarComponent } from './components/shared/searchbar/searchbar.component';
import { ProductViewComponent } from './components/main/product/product-view/product-view.component';
import { HomeComponent } from './components/home/home.component';
import { MyorderComponent } from './components/user/myorder/myorder.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductsComponent } from './components/admin/products/products.component';
import { OrdersComponent } from './components/admin/orders/orders.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ActiononUsersComponent } from './components/admin/users/actionon-users/actionon-users.component';
import { ActiononProductsComponent } from './components/admin/products/actionon-products/actionon-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { environment } from 'src/environments/environment';
import { AdminGuard } from './shared/guard/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    ProfileComponent,
    LoginComponent,
    SearchComponent,
    CartComponent,
    CarouselComponent,
    ProductComponent,
    ProductListComponent,
    SigninComponent,
    SignupComponent,
    ItemListComponent,
    ItemViewComponent,
    SearchbarComponent,
    ProductViewComponent,
    HomeComponent,
    MyorderComponent,
    DashboardComponent,
    ProductsComponent,
    OrdersComponent,
    UsersComponent,
    ActiononUsersComponent,
    ActiononProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragScrollModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthGuardGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
