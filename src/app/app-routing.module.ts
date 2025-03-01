import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'startups',
    loadChildren: () => import('./modules/startups/startups.module').then(m => m.StartupsModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/marketplace/marketplace.module').then(m => m.MarketplaceModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./modules/challenges/challenges.module').then(m => m.ChallengesModule)
  },
  {
    path: 'blog',
    loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
  },
  {
    path: 'startup-dashboard',
    loadChildren: () => import('./modules/startup-dashboard/startup-dashboard.module').then(m => m.StartupDashboardModule)
  },
  {
    path: 'company-dashboard',
    loadChildren: () => import('./modules/company-dashboard/company-dashboard.module').then(m => m.CompanyDashboardModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./modules/cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./modules/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
