import { Product,Clothing,Appliance} from  '../../data/products.js'
describe('Test Suite:Product Class',()=>{
  let product; 
   beforeEach(()=>{
    {
      product=new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
      })
    }
   })
      
  it('checking the equaltiy of all properties',()=>{
      
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
    expect(product.rating).toEqual({
          stars: 4.5,
          count: 87
        });
    expect(product.priceCents).toEqual(1090);
         
  })

  it('checking the PriceCents equality',()=>{
    expect(product.getPriceCents()).toEqual('$10.90'); 
  })

  it('get Stars Url',()=>{
    expect(product.getStarsUrl()).toEqual('images/ratings/rating-45.png')
  })
  it(' Does not contain Extra Info Function',()=>{
    expect(product.extraInfoHTML()).toEqual('');
  })
})

describe('Test Suite:Clothing class',()=>{

  let clothing ;
  beforeEach(()=>{
     clothing=new Clothing({
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      priceCents: 799,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png"
    } );
  })

  it('checking the equality of products especially sizeChartLink',()=>{
    expect(clothing.sizeChartLink).toEqual('images/clothing-size-chart.png');
  })

  it('Displays the size chart link in the extraInfoHTML',()=>{
    expect(clothing.extraInfoHTML()).toContain(`<a href="images/clothing-size-chart.png" target="_blank">sizeChartLink</a>`);
  })
})

describe('Test Suite : Appliance Class',()=>{

  let  appliance;
  beforeEach(()=>{
    appliance=new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      priceCents: 1899,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type:"appliance",
      instructionsLink:"images/appliance-instructions.png",
      warrantyLink:"images/appliance-warranty.png"
      })
    })
    it('checking all the equalities of the appliance class',()=>{

      expect(appliance.id).toEqual("54e0eccd-8f36-462b-b68a-8182611d9add");
      expect(appliance.image).toEqual("images/products/black-2-slot-toaster.jpg");
      expect(appliance.instructionsLink).toEqual("images/appliance-instructions.png");
      expect(appliance.warrantyLink).toEqual("images/appliance-warranty.png");

    })

    it('Displays the extraInFoHTML in appliance',()=>{
      expect(appliance.extraInfoHTML()).toContain(`<a href="images/appliance-instructions.png" target="_blank">Instructions</a>
             <a href="images/appliance-warranty.png" target="_blank">Warranty</a>`)
    })

  })
