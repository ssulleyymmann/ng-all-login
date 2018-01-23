import { BaseLoginProvider } from "../entities/base-login-provider";
import { SocialUser } from "../entities/user";

declare let IN: any;

export class LinkedinLoginProvider extends BaseLoginProvider {
  protected auth2: any;

  public static readonly PROVIDER_ID: string = "LINKEDIN";

  constructor(private clientId: string, private scope = 'email,public_profile') { super(); }

  initialize(): Promise<SocialUser> {
    return new Promise((resolve, reject) => {
      this.loadScript(LinkedinLoginProvider.PROVIDER_ID,
        "//platform.linkedin.com/in.js",
        () => {
          IN.init({
            api_key: this.clientId,
            onLoad: () => {
              console.log("Fully Loaded", IN.user);
            },
            authorize: true
          })

          console.log("=========>", IN, this.clientId)
          // IN.AppEvents.logPageView(); #FIX for #18

          // IN.onLinkedInLoad(function (response: any) {

          // console.log("========response=>",response)
          //   if (response.status === 'connected') {
          //     let authResponse = response.authResponse;
          //     IN.api('/me?fields=name,email,picture,first_name,last_name', (response: any) => {
          //       let user: SocialUser = new SocialUser();

          //       user.id = response.id;
          //       user.name = response.name;
          //       user.email = response.email;
          //       user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
          //       user.firstName = response.first_name;
          //       user.lastName = response.last_name;
          //       user.authToken = authResponse.accessToken;

          //       resolve(user);
          //     });
          //   }
          // });
        });
    });
  }

  signIn(): Promise<SocialUser> {
    let self = this;
    return new Promise((resolve, reject) => {
      console.log("===IN======>", IN)
      IN.User.authorize(() => {
        IN.API.Profile('me').fields([
          'firstName',
          'lastName',
          'emailAddress'
        ]).result((res: any) => {
          
          console.log("=======res====>>>>",res)

         

         

          
        });
        // IN.API.Raw("/people/~:(id,first-name,last-name,email-address,picture-url)").result((res: any) => {
        //   let userDetails = { name: res.firstName + " " + res.lastName, email: res.emailAddress, uid: res.id, provider: "linkedIN", image: res.pictureUrl };
        //   localStorage.setItem('_login_provider', 'linkedin');
        //   console.log("___________userDetails______", userDetails)
        // });
      });
      // IN.User.authorize(() => {

      // });
      //       IN.Event.on(IN, "auth",((data:any)=>{
      //  console.log("____________s_",data)
      //       }) );
      // IN.login((response: any) => {
      //   if (response.authResponse) {
      //     let authResponse = response.authResponse;
      //     IN.api('/me?fields=name,email,picture,first_name,last_name', (response: any) => {
      //       let user: SocialUser = new SocialUser();

      //       user.id = response.id;
      //       user.name = response.name;
      //       user.email = response.email;
      //       user.photoUrl = "https://graph.facebook.com/" + response.id + "/picture?type=normal";
      //       user.firstName = response.first_name;
      //       user.lastName = response.last_name;
      //       user.authToken = authResponse.accessToken;

      //       resolve(user);
      //     });
      //   }
      // }, { scope: this.scope });
    });
  }
  getProfileData() {
    console.log("------", IN)
    IN.API.Profile("me").fields("first-name", "last-name", "email-address", "picture-url").result((data: any) => {
      let user: SocialUser = new SocialUser();
      console.log("_______", data)
      var userdata = data.values[0];
      var fname = userdata.firstName;
      var lname = userdata.lastName;
      var email = userdata.emailAddress;
      var profile_photo = userdata.pictureUrl;
      this.signOut();
    }).error((data: any) => {
      console.log(data);
    });
  }
  signOut(): Promise<any> {
    return new Promise((resolve, reject) => {
      IN.logout((response: any) => {
        resolve();
      });
    });
  }

}
