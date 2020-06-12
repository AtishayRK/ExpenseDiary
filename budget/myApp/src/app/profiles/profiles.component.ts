import { Component, OnInit } from '@angular/core';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit() : void{

  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`;
    });
  }


}
