import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actitudes',
  templateUrl: './actitudes.component.html',
  styleUrls: ['./actitudes.component.scss']
})
export class ActitudesComponent implements OnInit {

  form: FormGroup;
  skillsAvaible = [
    {
      title: 'Lenguaje Python',
      name: 'python',
      img: '/assets/python.svg',
    },
    {
      title: 'HTML',
      name: 'html',
      img: '/assets/html.png',
    },
    {
      title: 'CSS',
      name: 'css',
      img: '/assets/css.png',
    },
    {
      title: 'Lenguaje java',
      name: 'java',
      img: '/assets/java.svg',
    },
    {
      title: 'CSS',
      name: 'css',
      img: '/assets/css.png',
    },
    {
      title: 'Lenguaje java',
      name: 'java',
      img: '/assets/java.svg',
    },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = formBuilder.group({
      selectedSkills: new FormArray([]),
    });
  }

  onCheckboxChange(event: any) {
    console.log('change');
    const selectedSkills = this.form.controls['selectedSkills'] as FormArray;
    if (event.target.checked) {
      selectedSkills.push(new FormControl(event.target.value));
    } else {
      const index = selectedSkills.controls.findIndex(
        (x) => x.value === event.target.value
      );
      selectedSkills.removeAt(index);
    }
  }

  submit() {
    console.log(this.form.value);
    this.router.navigate(['skills/test-skill']);
  }

  ngOnInit(): void {
    console.log('init del check');
  }

}
