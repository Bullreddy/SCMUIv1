import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ApplicationformComponent } from './components/applicationform/applicationform.component';
import { ServicesComponent } from './components/services/services.component';
import { StudentlistComponent } from './components/studentlist/studentlist.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ApplayoutComponent } from './components/applayout/applayout.component';
import {AuthGuard} from './auth.gaurd';
/**
 * All the routes for our application
 */
const routes: Routes = [
	{path: '', pathMatch: 'full', redirectTo: 'login'},
		{ 
			path: '',
			component: ApplayoutComponent, 
			
			children: [
				{ path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard],data: {title: 'Dashboard'}},
				{ path: 'applicationform', component: ApplicationformComponent,canActivate: [AuthGuard],data: {title: 'ApplicationForm'}},
				{ path: 'services', component: ServicesComponent,canActivate: [AuthGuard],data: {title: 'Service'}},
				{ path: 'studentlist', component: StudentlistComponent,canActivate: [AuthGuard],data: {title: 'StudentList'}},
				{ path: 'contact', component: ContactComponent,canActivate: [AuthGuard],data: {title: 'Contact'}}
			]
		},
	
	
		{ path: 'login', component: LoginComponent,canActivate: [AuthGuard]},
	
	
		{ path: '**', redirectTo: 'login' }
	
		];

export const appRoutingProviders: any[] = [
];

export const appRoutingDeclarations: any[] = [
];

export const routing = RouterModule.forRoot(routes, { useHash: false });