
const {token} = require('../../mongodb/model');
const mongoose = require('mongoose');

let { 
  checkEmail, 
  createtoken, 
  editbuying_user, 
  createbuying_user, 
  deletebuying_user, 
  deletetoken,
  checkAuth,
  getbuying_userAll
} = require('../../mongodb/services')


describe('Test services', () => {
  let db;
  const mocktoken = {name: 'John Doe', email: 'doe@gmail.com',pass:'john'};
  const fakebuying_users = [
    {
      _id:'61e930fdb0c7fa200876eca6',
      title:'Reading Java',
      dueDate: '20 Jan 2022',
      time:'20/01 16:53:01'
    },
    {
      _id:'61e9a0fdb0c7fa200876eca8',
      title:'Reading Nodejs',
      dueDate: '21 Jan 2022',
      time:'20/01 19:53:01'
    }
  ]
  const faketoken = {
    _id: '5dbff32e367a343830cd2f49',
    email: 'test@gmail.com',
    pass:'test@123',
    buying_user: fakebuying_users
  }
  
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    db = mongoose.connection;
    // mongoose.connection.dropCollection('tokens');
  });
  afterAll(async () => {
    await db.close();
  });

  
    it('should create token', async () => {
      await createtoken(mocktoken.name,mocktoken.email,mocktoken.pass);
      const insertedtoken = await token.findOne({email: mocktoken.email});
      expect(insertedtoken.name).toEqual(mocktoken.name);
    });

    it('should check token email ',async()=>{
      const mockedEmail = 'doe@gmail.com';
        const response = await checkEmail(mockedEmail)
        expect(response).toEqual(mockedEmail)
    })

    it('Should return false for wrong credentials', async () => {
      const randomPayload = {email: 'random@gmail.com', password: 'password@123'};
      const response = await checkAuth(randomPayload.email, randomPayload.password);
      expect(response).toBe(false);
    })

    it('should return true for correct credentials', async() => {
      const response = await checkAuth(mocktoken.email, mocktoken.password);
      expect(response).toBe(false);
    })

    it('should create buying_user', async () => {
      const mockbuying_user = {title: 'Wash shoes',dates:'20/1 10:59:00'};
      let token = await token.findOne();
      expect(typeof token?.email).toBe("string");
      await createbuying_user(token._id,mockbuying_user.title,mockbuying_user.dates);
      token = await token.findOne({_id: token._id});
      const  lastbuying_user = (token.buying_user[token.buying_user.length-1]);
      expect(lastbuying_user.title).toEqual(mockbuying_user.title);
    });

    it('should edit buying_user', async () => {
      let token = await token.findOne();
      expect(typeof token?.email).toBe("string");
      expect(token.buying_user.length > 0).toBe(true);
      const mockbuying_user = {buying_user_id: token.buying_user[0]._id, title: 'Wash dishes',dates:'20/1 10:59:00'};
      await editbuying_user(token._id,mockbuying_user.buying_user_id,mockbuying_user.title,mockbuying_user.dates);
      token = await token.findOne({_id: token._id});
      const editedIndex = token.buying_user.findIndex(x=> String(x._id)==String(mockbuying_user.buying_user_id));
      expect(token.buying_user[editedIndex].title).toEqual(mockbuying_user.title);
    });

    // to fix later
    it('delete token ',async()=>{
      const mockedId = '61e927360beb3087386c2b3a';
      const deletedtoken = await deletetoken(mockedId)
      expect(deletedtoken.ok).toEqual(1)
    })

    
    it('should get all token buying_users ', async() => {
     
       /*Mock mongoose findOne*/
       jest.spyOn(token, 'findOne').mockReturnValue(Promise.resolve(faketoken))
        const response = await getbuying_userAll(faketoken.id);
        expect(response).toBe(faketoken.buying_user);
    })

    it('Should return false when getbuying_userAll passed with a not found token id ', async() => {
       /*Mock mongoose findOne*/
       jest.spyOn(token, 'findOne').mockReturnValue(Promise.resolve(null))
        const response = await getbuying_userAll('5dbff32e367a343830cd2f49');
        expect(response).toBe(false);
    })

    it('Should delete buying_user successfully', async() => {
       /*Mock mongoose findOne*/
       jest.spyOn(token, 'findOne').mockReturnValue(Promise.resolve(faketoken));
       const response = await deletebuying_user(faketoken._id, faketoken.buying_user[0]._id);
       expect(response.success).toBe(true);
    });

    it('Should return false success when an error is thrown', async() => {
      /*Mock mongoose findOne*/
      jest.spyOn(token, 'findOne').mockReturnValue(Promise.resolve(faketoken));
      /*Mock mongoose updateOne*/
      jest.spyOn(token, 'updateOne').mockReturnValue(Promise.resolve(null));
      const response = await deletebuying_user(faketoken._id, faketoken.buying_user[0]._id);
      expect(response.success).toBe(false);
   });

  });
