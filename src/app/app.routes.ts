import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin-guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then(m => m.HomeComponent)
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then(m => m.AboutComponent)
  },

  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events').then(m => m.EventsComponent)
  },

  {
    path: 'events/:id',
    loadComponent: () =>
      import('./pages/event-details/event-details').then(m => m.EventDetailsComponent)
  },

  {
    path: 'membership',
    loadComponent: () =>
      import('./pages/membership/membership').then(m => m.MembershipComponent)
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then(m => m.ContactComponent)
  },

  {
    path: 'payment',
    loadComponent: () =>
      import('./pages/payment/payment').then(m => m.PaymentComponent)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },

  {
    path: 'admin/dashboard',
    loadComponent: () =>
      import('./pages/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/events/create',
    loadComponent: () =>
      import('./pages/create-event/create-event').then(m => m.CreateEventComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/events/edit/:id',
    loadComponent: () =>
      import('./pages/create-event/create-event').then(m => m.CreateEventComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'poster-preview/:id',
    loadComponent: () =>
      import('./pages/poster-preview/poster-preview').then(m => m.PosterPreviewComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/income/create',
    loadComponent: () =>
      import('./pages/create-income/create-income').then(m => m.CreateIncomeComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/expenses/create',
    loadComponent: () =>
      import('./pages/create-expense/create-expense').then(m => m.CreateExpenseComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/finance-summary',
    loadComponent: () =>
      import('./pages/finance-summary/finance-summary').then(m => m.FinanceSummaryComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/members',
    loadComponent: () =>
      import('./pages/member-list/member-list').then(m => m.MemberListComponent),
    canActivate: [adminGuard]
  },

  {
    path: 'member-list',
    redirectTo: 'admin/members'
  },

  {
    path: 'admin/payments',
    loadComponent: () =>
      import('./pages/payment-list/payment-list').then(m => m.PaymentList),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/income',
    loadComponent: () =>
      import('./pages/income-list/income-list').then(m => m.IncomeList),
    canActivate: [adminGuard]
  },

  {
    path: 'admin/expenses',
    loadComponent: () =>
      import('./pages/expense-list/expense-list').then(m => m.ExpenseList),
    canActivate: [adminGuard]
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/forgot-password/forgot-password').then(
        m => m.ForgotPasswordComponent
      )
  },

  {
    path: '**',
    redirectTo: ''
  }
];