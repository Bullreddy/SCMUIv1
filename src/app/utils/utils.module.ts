import { NgModule, ModuleWithProviders,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SideNavComponent } from './sidenav/sidenav.component';
import { routing, appRoutingProviders, appRoutingDeclarations } from '../app.routes';


/**
* Do not specify providers for modules that might be imported by a lazy loaded module.
*/

@NgModule({
	imports: [CommonModule, RouterModule, BrowserAnimationsModule, routing, FormsModule, ReactiveFormsModule],
	// declarations: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	// exports: [HeaderComponent, FooterComponent, SubHeaderComponent, SideNavComponent, CommonModule, FormsModule, RouterModule]
	declarations: [HeaderComponent, FooterComponent,  SideNavComponent],
	exports: [HeaderComponent, FooterComponent,  SideNavComponent, CommonModule, FormsModule, RouterModule]})
export class SharedModule {
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: []
		};
	}
}
