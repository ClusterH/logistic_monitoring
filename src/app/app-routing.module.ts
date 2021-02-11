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
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'vehicle',
    loadChildren: () => import('./vehicles/vehicle.module').then(m => m.VehiclePageModule)
  },
  {
    path: 'route',
    loadChildren: () => import('./routes/routeList.module').then(m => m.RouteListPageModule)
  },
  {
    path: 'title',
    loadChildren: () => import('./title/title.module').then(m => m.TitlePageModule)
  },
  {
    path: 'new-route',
    loadChildren: () => import('./new-route/new-route.module').then(m => m.NewRoutePageModule)
  },
  {
    path: 'check-gps',
    loadChildren: () => import('./check-gps/check-gps.module').then(m => m.CheckGpsPageModule)
  },
  {
    path: 'inspection',
    loadChildren: () => import('./inspection/inspection.module').then(m => m.InspectionPageModule)
  },
  {
    path: 'onroute',
    loadChildren: () => import('./onroute/onroute.module').then(m => m.OnroutePageModule)
  },
  {
    path: 'hazard-report',
    loadChildren: () => import('./hazard-report/hazard-report.module').then(m => m.HazardReportPageModule)
  },
  {
    path: 'periodic-report',
    loadChildren: () => import('./periodic-report/periodic-report.module').then(m => m.PeriodicReportPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
