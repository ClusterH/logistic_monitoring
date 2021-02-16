import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./modules/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./modules/forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./modules/vehicles/vehicle.module').then(m => m.VehiclePageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./modules/routes/routeList.module').then(m => m.RouteListPageModule)
  },

  {
    path: 'new-route',
    loadChildren: () => import('./modules/new-route/new-route.module').then(m => m.NewRoutePageModule)
  },
  {
    path: 'check-gps',
    loadChildren: () => import('./modules/check-gps/check-gps.module').then(m => m.CheckGpsPageModule)
  },
  {
    path: 'inspection',
    loadChildren: () => import('./modules/inspection/inspection.module').then(m => m.InspectionPageModule)
  },
  {
    path: 'onroute',
    loadChildren: () => import('./modules/onroute/onroute.module').then(m => m.OnroutePageModule)
  },
  {
    path: 'hazard-report',
    loadChildren: () => import('./modules/hazard-report/hazard-report.module').then(m => m.HazardReportPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
