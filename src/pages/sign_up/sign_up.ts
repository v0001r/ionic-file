import { Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { Sign_inPage } from '../sign_in/sign_in';
import { LoadingController } from 'ionic-angular';

// import { VerificationPage } from '../verification/verification';
@Component({
  selector: 'page-sign_up',
  templateUrl: 'sign_up.html'
})
// export class Sign_upPage {
	export class Sign_upPage implements OnInit{
data: any = {};

  constructor(public navCtrl: NavController, public httpClient: HttpClient, public alertController: AlertController,public loadingController: LoadingController) {
   this.data.name = '';
 this.data.mobile = '';
 this.data.pasword = '';
 this.data.response = '';
  }
     ngOnInit(){}
 verification(){
        //this.navCtrl.push(VerificationPage)
		
		let postData = {
            //"car_details_id": localStorage.getItem("id"),
            "name": this.data.name,
            "mobile": this.data.mobile,
			"password": this.data.pasword
    }
let loading =  this.loadingController.create({
      duration: 2000
    });
      loading.present();
    this.httpClient.post("https://cars110.in/qrcode/api/agent_reg", JSON.stringify(postData))
      .subscribe(data => {
        console.log(data['message']);
		
		if(data['status']== 200){
		let alert = this.alertController.create({
											title: 'Success',
											subTitle: 'Registration Successfully. Please Login to continue.',
											buttons: ['Dismiss']
											});
										  alert.present();
		this.navCtrl.setRoot(Sign_inPage)
		}else{
			let alert = this.alertController.create({
											title: 'Success',
											subTitle: data['message'],
											buttons: ['Dismiss']
											});
										  alert.present();
		}
		
       }, error => {
	   let alert = this.alertController.create({
											title: 'Error',
											subTitle: 'Registration Failed.',
											buttons: ['Dismiss']
											});
										  alert.present();
        console.log(error);
      });

	
  } 

}
