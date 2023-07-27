import { Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  car: string = "used_cars";
// img_path: string= "https://cars110.in/qrcode/uploads/gallery_photo/";
  // banner_img_path: string= "https://cars110.in/qrcode/uploads/photo/";
// banner_image: any;
total_points: any;
r_points:any;
over_all: any;
last_history: any[];
scannedData: any;
  encodedData: '';
  encodeData: any;
  constructor( public navCtrl: NavController, public httpClient: HttpClient, public loadingController: LoadingController,public navParams: NavParams, private barcodeScanner: BarcodeScanner, private alertCtrl: AlertController) {

 const agent_id = localStorage.getItem('agent_id');
this.httpClient.get('https://cars110.in/qrcode/api/get_total/' + agent_id).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.total_points = success.data;
		    console.log(success);        
		}
      }
    );
	
	this.httpClient.get('https://cars110.in/qrcode/api/get_overall_points/' + agent_id).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.over_all = success.data;
		    console.log(success);        
		}
      }
    );
	
	this.httpClient.get('https://cars110.in/qrcode/api/get_last_history/' + agent_id).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.last_history = success.data;
		    console.log(success);        
		}
      }
    );
	

this.httpClient.get('https://cars110.in/qrcode/api/get_total_redeem/' + agent_id).subscribe(
(success: any) => {
	if (success.status == 200) {
		this.r_points = success.data;
		    console.log(success);        
		}
      }
    );


  }
  
  ngOnInit(){}
 
goToBarcodeScan(){
this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData['text'];
    }).catch(err => {
      console.log('Error', err);
    });
	
	 
	
	}

submit_coupon(){
	
	const agent = localStorage.getItem('agent_id');
if(this.scannedData){
	  let postData = {
            "id": agent,
			"scan_code": this.scannedData
    }

    this.httpClient.post("https://cars110.in/qrcode/api/coupon_process", JSON.stringify(postData))
      .subscribe(data => {
		if(data['status'] == 200){
			
			this.httpClient.get('https://cars110.in/qrcode/api/get_total/' + agent).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.total_points = success.data;
		    console.log(success);        
		}
      }
    );
	this.httpClient.get('https://cars110.in/qrcode/api/get_last_history/' + agent).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.last_history = success.data;
		    console.log(success);        
		}
      }
    );
	
	this.httpClient.get('https://cars110.in/qrcode/api/get_overall_points/' + agent).subscribe(
(success: any) => {
        if (success.status == 200) {
		this.over_all = success.data;
		    console.log(success);        
		}
      }
    );
	
	this.httpClient.get('https://cars110.in/qrcode/api/get_total_redeem/' + agent).subscribe(
(success: any) => {
	if (success.status == 200) {
		this.r_points = success.data;
		    console.log(success);        
		}
      }
    );

		let alert = this.alertCtrl.create({
											title: 'Success',
											subTitle: data['message'],
											buttons: ['Dismiss']
											});
										  alert.present();
										  
										  this.scannedData = '';
		}else{
			let alert = this.alertCtrl.create({
											title: 'Error',
											subTitle: data['message'],
											buttons: ['Dismiss']
											});
										  alert.present();
										  this.scannedData = '';
		}
		
		}, error => {
	   
        console.log(error);
      });
}else{
	
	let alert = this.alertCtrl.create({
											title: 'Error',
											subTitle: 'Please Scan the QR Code',
											buttons: ['Dismiss']
											});
										  alert.present();
	
}
}

}
