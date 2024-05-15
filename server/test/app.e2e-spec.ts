import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersController } from '../src/users/users.controller';
import { UsersService } from '../src/users/users.service';
import { User } from '../src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersService;

  const mockUserRepository = {
    find: jest.fn(),
    create: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersService = moduleFixture.get<UsersService>(UsersService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/users (GET)', async () => {
    const users: User[] = [
      { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] },
      { id: uuidv4(), name: 'Jane Doe', email: 'jane@example.com', cards: [] },
    ];
    jest.spyOn(usersService, 'findAll').mockResolvedValue(users);

    const response = await request(app.getHttpServer()).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(users);
  });

  it('/users/:id (GET)', async () => {
    const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
    jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
  
    const response = await request(app.getHttpServer()).get(`/users/${user.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it('/users (POST)', async () => {
    const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
    jest.spyOn(usersService, 'create').mockResolvedValue(user);

    const response = await request(app.getHttpServer()).post('/users').send(user);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(user);
  });

  it('/users/:id (PUT)', async () => {
    const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
    jest.spyOn(usersService, 'update').mockResolvedValue(user);

    const response = await request(app.getHttpServer()).put(`/users/${user.id}`).send(user);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(user);
  });

  it('/users/:id (DELETE)', async () => {
    const userId = uuidv4();
    jest.spyOn(usersService, 'remove').mockResolvedValue();

    const response = await request(app.getHttpServer()).delete(`/users/${userId}`);
    expect(response.status).toBe(200);
  });
});