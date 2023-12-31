import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { LoginSignupFooterComponent } from './components/login-signup-footer/login-signup-footer.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';
import { TrashContainerComponent } from './components/trash-container/trash-container.component';
import { ArchiveContainerComponent } from './components/archive-container/archive-container.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { NoteFooterIconsComponent } from './components/note-footer-icons/note-footer-icons.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { EditNoteModalComponent } from './components/edit-note-modal/edit-note-modal.component';
import { SearchNotePipeComponent } from './components/search-note-pipe/search-note-pipe.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    SideNavBarComponent,
    LoginSignupFooterComponent,
    NotesContainerComponent,
    TrashContainerComponent,
    ArchiveContainerComponent,
    AddNoteComponent,
    NoteFooterIconsComponent,
    NoteCardComponent,
    EditNoteModalComponent,
    SearchNotePipeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
