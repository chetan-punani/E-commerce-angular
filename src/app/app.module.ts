import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
