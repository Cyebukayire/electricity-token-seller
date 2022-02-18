let services = require('../../mongodb/services');

describe("Token controller", ()=> {
    test("should register token", ()=> {
        const mock = jest.spyOn(services, "createtoken");
        mock.mockImplementation((amount, meter_numer, pass)=> "token Created");
        let text = services.createtoken("foo", "foo@gmail.com", "123");
        expect(text).toEqual("token Created");
        mock.mockRestore();
    });
});