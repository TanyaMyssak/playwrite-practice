import { test, expect, request as baseRequest } from '@playwright/test';
import AuthController from '../api/controllers/AuthController';
import { usersList } from '../test-data/users';



test.describe('API tests for creating cars', () => {

  let sid: string;

  test.beforeAll(async () => {
    const requestContext = await baseRequest.newContext();
    const authController = new AuthController(requestContext);

    sid = await authController.getAuthCookie(
      usersList.mainUser.email,
      usersList.mainUser.password
    );

    expect(sid).toBeTruthy();
  });

  test('✅ Positive: create a valid car', async ({ request }) => {
    const carData = {
      carBrandId: 2, // BMW
      carModelId: 9, // X6
      mileage: 12345
    };

    const response = await request.post('/api/cars/', {
      data: carData,
      headers: {
        'Cookie': sid
      }
    });

    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.data.carBrandId).toBe(carData.carBrandId);
    expect(body.data.carModelId).toBe(carData.carModelId);
    expect(body.data.mileage).toBe(carData.mileage);
    expect(body.data.initialMileage).toBe(carData.mileage);
    
  });

  test('❌ Negative: missing mileage field', async ({ request }) => {
    const invalidCar = {
      carBrandId: 2,
      carModelId: 9
      // mileage is missing
    };

    const response = await request.post('/api/cars/', {
      data: invalidCar,
      headers: {
        'Cookie': sid
      }
    });

    expect(response.status()).toBe(400); 
    const body = await response.json();
    expect(body.message || body.error).toBeDefined();
  });

  test('❌ Negative: wrong brand/model ID', async ({ request }) => {
    const invalidCar = {
      carBrandId: 999, // invalid ID
      carModelId: 999,
      mileage: 1000
    };

    const response = await request.post('/api/cars/', {
      data: invalidCar,
      headers: {
        'Cookie': sid
      }
    });

    expect(response.status()).toBe(404); 
    const body = await response.json();
    expect(body.message || body.error).toBeDefined();
  });
});
