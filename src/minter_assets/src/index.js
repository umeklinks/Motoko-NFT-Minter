// The minter is the representation of the minter contract in main.mo but in JavaScript
import { minter } from "../../declarations/minter";

// This is library to use with principal that is provided by Dfinity
import { Principal } from "@dfinity/principal";
import { StoicIdentity } from "ic-stoic-identity";

document.getElementById("wallet_2").style.display = "none";
document.getElementById("connectStoic").style.display = "block";
document.getElementById("showNFT").style.display = "none";

const reg_wallet = document.getElementById("connectStoic");
reg_wallet.addEventListener("click", async () => {
  StoicIdentity.load().then(async (identity) => {
    if (identity !== false) {
      //ID is a already connected wallet!
      document.getElementById("wallet_2").style.display = "block";
      document.getElementById("connectStoic").style.display = "none";
      document.getElementById("showNFT").style.display = "block";

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Connected successfully",
      });
    } else {
      //No existing connection, lets make one!
      identity = await StoicIdentity.connect();
      document.getElementById("connectStoic").style.display = "block";
      document.getElementById("wallet_2").style.display = "none";
      document.getElementById("showNFT").style.display = "none";
    }

    //Lets display the connected principal!
    // console.log(identity.getPrincipal().toText());

    const my_wal = document.getElementById("principal");
    my_wal.value = await identity.getPrincipal().toText();

    //Create an actor canister
    const actor = Actor.createActor(idlFactory, {
      agent: new HttpAgent({
        identity,
      }),
      canisterId,
    });

    //Disconnect after
    StoicIdentity.disconnect();
  });
});

// s7cxu-sikor-uwiaa-aaaaa-b4aay-eaqca-aaazj-a
// let shutoff = StoicIdentity.disconnect();
const logout = document.getElementById("wallet_2");
logout.addEventListener("click", async () => {
  Swal.fire({
    title: "Log out?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#198754 !important;",
    cancelButtonColor: "#d33",
    confirmButtonText: "Wallet Disconnected!",
  }).then((result) => {
    if (result.isConfirmed) {
      StoicIdentity.load().then(async (identity) => {
        //Disconnected ID wallet!

        // identity = await StoicIdentity.disconnect();
        document.getElementById("connectStoic").style.display = "block";
        document.getElementById("wallet_2").style.display = "none";
        document.getElementById("showNFT").style.display = "none";
        document.getElementById("principal").value = "";
      });
      Swal.fire("Logged Out!", "You have successfully logged out", "success");
    }
  });
});

// For beginners : This is really basic Javascript code that add an event to the "Mint" button so that the mint_nft function is called when the button is clicked.
const mint_button = document.getElementById("mint");
mint_button.addEventListener("click", mint_nft);
// mint_button.addEventListener("click", Swal.fire({
//     title: 'Are you sure?',
//     text: "You won't be able to revert this!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       mint_nft
//       Swal.fire(
//         'Deleted!',
//         'Your file has been deleted.',
//         'success'
//       )
//     }
//   })
// );

async function mint_nft() {
  // Get the principal from the input field.
  const principal_string = document
    .getElementById("principal")
    .value.toString();
  const principal = Principal.fromText(principal_string);
  const name = document.getElementById("name").value.toString();
  const mintId = await minter.mint_principal(name, principal);
  document.getElementById("nft").src = await minter.tokenURI(mintId);

  document.getElementById("nft").src = await minter.tokenURI(mintId);

  let timerInterval;
  Swal.fire({
    title: "Minting!",
    html: "Processing... <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
    
  }).then((result) => {
    /* Read more about handling dismissals below */
    // Get the url of the image from the input field
    const name = document.getElementById("name").value.toString();
    console.log("The url we are trying to mint is - " + name);
    document.getElementById("minting_info").innerHTML =
      "The url we are trying to mint is - " + name;

    // Get the principal from the input field.
    // const principal_string = document
    //   .getElementById("principal")
    //   .value.toString();
    // const principal = Principal.fromText(principal_string);

    // Mint the image by calling the mint_principal function of the minter.
    // const mintId = await minter.mint_principal(name, principal);
    // console.log("The id is " + Number(mintId));

    // Get the id of the minted image.

    // Get the url by asking the minter contract.
    // document.getElementById("nft").src = await minter.tokenURI(mintId);

    // Show some information about the minted image.
      document.getElementById("greeting").innerText =
      "This nft owner is: " +
      principal_string +
      "\nand the token ID is " +
      Number(mintId);
      Swal.fire("NFT Minted!", "", "success");
    
  });

  // Display all minted NFTs
// showNFT.addEventListener("click", async () => {
//   var ul = document.createElement("ul");
//   ul.setAttribute("id", "proList");

//   var nft_mnt_url = (doument.getElementById("nft").src =
//     await minter.tokenURI(mintId));
//   var t, tt;
//   nftList = [nft_mnt_url];

//   document.getElementById("minted_nft").appendChild(ul);
//   nftList.forEach(renderNftList);

//   function renderNftList(element, index, arr) {
//     var li = document.createElement("li");
//     li.setAttribute("class", "item");

//     var im = document.createElement("img");
//     img.setAttribute("id", "minted_nft");
//     document.getElementById("minted_nft").src = await minter.tokenURI(mintId);

//     li.appendChild(img);

//     ul.appendChild(li);

//     t = document.createElement(element);

//     li.innerHTML = li.innerHTML + element;
//   }
// });
// const my_wall = StoicIdentity.identity;

}
