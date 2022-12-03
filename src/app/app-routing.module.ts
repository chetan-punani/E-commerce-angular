import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { ProductViewComponent } from './components/main/product/product-view/product-view.component';
import { ProductComponent } from './components/main/product/product.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { MyorderComponent } from './components/user/myorder/myorder.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'singup',
    component: SignupComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'my-orders',
    component: MyorderComponent
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ProductComponent
      },
      {
        path: ':id',
        component: ProductViewComponent
      },
    ]
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin',
    component: DashboardComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
