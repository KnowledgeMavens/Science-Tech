class ParkingSystem(object):

    def __init__(self, big, medium, small):
        """
        :type big: int
        :type medium: int
        :type small: int
        """
        self.lotSize = [big, medium,small]

    def addCar(self, carSize):
        """
        :type carType: int
        :rtype: bool
        """
        if carSize == 1:
            if self.lotSize[0] > 0:
                self.lotSize[0]-=1    
                return True
        if carSize == 2:
            if self.lotSize[1] > 0:
                self.lotSize[0]-=1    
                return True
        if carSize == 3:
            if self.lotSize[2] > 0:
                self.lotSize[0]-=1    
                return True
        return False