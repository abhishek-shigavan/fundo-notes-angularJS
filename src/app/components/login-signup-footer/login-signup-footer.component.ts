import { Component, ViewEncapsulation } from '@angular/core';

interface Language {
  language: string;
  country: string;
}

@Component({
  selector: 'app-login-signup-footer',
  templateUrl: './login-signup-footer.component.html',
  styleUrls: ['./login-signup-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginSignupFooterComponent {
  languages: Language[] = [
    { language: 'English', country: 'United States' },
    { language: 'Spanish', country: 'Spain' },
    { language: 'French', country: 'France' },
    { language: 'German', country: 'Germany' },
    { language: 'Chinese', country: 'China' },
    { language: 'Japanese', country: 'Japan' },
    { language: 'Italian', country: 'Italy' },
    { language: 'Portuguese', country: 'Portugal' },
    { language: 'Russian', country: 'Russia' },
    { language: 'Arabic', country: 'Saudi Arabia' },
    { language: 'Dutch', country: 'Netherlands' },
    { language: 'Swedish', country: 'Sweden' },
    { language: 'Korean', country: 'South Korea' },
    { language: 'Greek', country: 'Greece' },
    { language: 'Turkish', country: 'Turkey' },
    { language: 'Hindi', country: 'India' },
    { language: 'Thai', country: 'Thailand' },
    { language: 'Vietnamese', country: 'Vietnam' },
    { language: 'Polish', country: 'Poland' },
    { language: 'Hungarian', country: 'Hungary' },
  ];
  selectedLang = this.languages[0].language;
}
