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
import { AuthGuardGuard } from './shared/guard/auth-guard.guard';
import { AdminGuard } from './shared/guard/admin.guard';

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
    component: ProfileComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'my-orders',
    component: MyorderComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'product',
    children: [
      {
        path: '',
        component: ProductComponent,
      },
      {
        path:':category',
        children: [
          {
            path: ':id',
            component: ProductViewComponent
          }
        ]
       
      },
    ]
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard, AdminGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
