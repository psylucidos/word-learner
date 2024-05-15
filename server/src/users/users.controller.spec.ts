import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;
  let repository: Repository<User>;

  const mockUserRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users: User[] = [
        { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] },
        { id: uuidv4(), name: 'Jane Doe', email: 'jane@example.com', cards: [] },
      ];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(result).toEqual(users);
    });
  });

  it('should find one user', async () => {
    const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
    jest.spyOn(service, 'findOne').mockResolvedValue(user);

    expect(await controller.findOne(user.id)).toBe(user);
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
      mockUserRepository.save.mockResolvedValue(user);

      const result = await controller.create(user);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userId = uuidv4();
      const user: User = { id: userId, name: 'John Doe', email: 'john@example.com', cards: [] };
      mockUserRepository.findOne.mockResolvedValue(user); // Return a user object
      mockUserRepository.findOneBy.mockResolvedValue(user); // Return a user object
      mockUserRepository.save.mockResolvedValue(user);
  
      const result = await controller.update(userId, user);
      expect(result).toEqual(user);
    });

    it('should throw an error if the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      try {
        await controller.update(uuidv4(), { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove an existing user', async () => {
      const user: User = { id: uuidv4(), name: 'John Doe', email: 'john@example.com', cards: [] };
      mockUserRepository.findOne.mockResolvedValue(user);
      mockUserRepository.delete.mockResolvedValue({});

      await controller.remove(user.id);
      expect(mockUserRepository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if the user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      try {
        await controller.remove(uuidv4());
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });
  });
});